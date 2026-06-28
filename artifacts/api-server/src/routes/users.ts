import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, linksTable, appearancesTable, profileViewsTable, linkClicksTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { generateId, getTodayDate } from "../lib/id";
import { generatePresignedUploadUrl } from "../lib/r2";
import { createOrder, captureOrder } from "../lib/paypal";

const router = Router();

async function ensureUserExists(userId: string, email: string): Promise<void> {
  const existing = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
  });

  if (!existing) {
    const base = email.split("@")[0].replace(/[^a-z0-9_]/gi, "").toLowerCase().slice(0, 20);
    let username = base || "user";
    let counter = 0;
    while (true) {
      const candidate = counter === 0 ? username : `${username}${counter}`;
      const taken = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, candidate),
      });
      if (!taken) {
        username = candidate;
        break;
      }
      counter++;
    }

    await db.insert(usersTable).values({
      id: userId,
      username,
      email,
      isPremium: false,
      isVerified: false,
      viewCount: 0,
    });
  }
}

router.get("/users/me", requireAuth, async (req, res) => {
  try {
    await ensureUserExists(req.userId!, req.userEmail!);

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, req.userId!),
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const domain = process.env.APP_DOMAIN ?? "https://yourdomain.com";
    res.json({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      isPremium: user.isPremium,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      profileUrl: `${domain}/${user.username}`,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get user");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/me", requireAuth, async (req, res) => {
  try {
    const { username, displayName, bio, avatarUrl } = req.body as {
      username?: string;
      displayName?: string;
      bio?: string;
      avatarUrl?: string;
    };

    if (username) {
      const normalized = username.toLowerCase().trim();
      const reserved = ["admin", "api", "dashboard", "login", "register", "upgrade", "settings"];
      if (reserved.includes(normalized)) {
        res.status(400).json({ error: "Username is reserved" });
        return;
      }

      const existing = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, normalized),
      });

      if (existing && existing.id !== req.userId) {
        res.status(400).json({ error: "Username is already taken" });
        return;
      }
    }

    const updates: Partial<typeof usersTable.$inferInsert> = {};
    if (username !== undefined) updates.username = username.toLowerCase().trim();
    if (displayName !== undefined) updates.displayName = displayName;
    if (bio !== undefined) updates.bio = bio;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    await db.update(usersTable).set(updates).where(eq(usersTable.id, req.userId!));

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, req.userId!),
    });

    const domain = process.env.APP_DOMAIN ?? "https://yourdomain.com";
    res.json({
      id: user!.id,
      username: user!.username,
      displayName: user!.displayName,
      email: user!.email,
      avatarUrl: user!.avatarUrl,
      bio: user!.bio,
      isPremium: user!.isPremium,
      isVerified: user!.isVerified,
      createdAt: user!.createdAt.toISOString(),
      profileUrl: `${domain}/${user!.username}`,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update user");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/me/avatar-upload-url", requireAuth, async (req, res) => {
  try {
    const { contentType, fileName } = req.body as { contentType: string; fileName: string };
    const ext = fileName.split(".").pop() ?? "jpg";
    const key = `avatars/${req.userId}/${generateId()}.${ext}`;
    const result = await generatePresignedUploadUrl(key, contentType);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to generate avatar upload URL");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/me/background-upload-url", requireAuth, async (req, res) => {
  try {
    const { contentType, fileName } = req.body as { contentType: string; fileName: string };
    const ext = fileName.split(".").pop() ?? "jpg";
    const key = `backgrounds/${req.userId}/${generateId()}.${ext}`;
    const result = await generatePresignedUploadUrl(key, contentType);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to generate background upload URL");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/me/stats", requireAuth, async (req, res) => {
  try {
    await ensureUserExists(req.userId!, req.userEmail!);

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, req.userId!),
    });

    const links = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, req.userId!));

    const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
    const domain = process.env.APP_DOMAIN ?? "https://yourdomain.com";

    res.json({
      totalViews: user?.viewCount ?? 0,
      totalClicks,
      totalLinks: links.length,
      isPremium: user?.isPremium ?? false,
      profileUrl: `${domain}/${user?.username ?? ""}`,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/me/analytics", requireAuth, async (req, res) => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, req.userId!),
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const links = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, req.userId!));

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0];

    const recentViews = await db
      .select()
      .from(profileViewsTable)
      .where(eq(profileViewsTable.userId, req.userId!));

    const recentClicks = await db
      .select()
      .from(linkClicksTable)
      .where(eq(linkClicksTable.userId, req.userId!));

    const last30Views = recentViews.filter((v) => v.viewDate >= thirtyDaysAgoStr);
    const last30Clicks = recentClicks.filter((c) => c.clickDate >= thirtyDaysAgoStr);

    const viewsByDate = new Map<string, number>();
    const clicksByDate = new Map<string, number>();

    last30Views.forEach((v) => {
      viewsByDate.set(v.viewDate, (viewsByDate.get(v.viewDate) ?? 0) + 1);
    });
    last30Clicks.forEach((c) => {
      clicksByDate.set(c.clickDate, (clicksByDate.get(c.clickDate) ?? 0) + 1);
    });

    const days: { date: string; views: number; clicks: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      days.push({
        date: dateStr,
        views: viewsByDate.get(dateStr) ?? 0,
        clicks: clicksByDate.get(dateStr) ?? 0,
      });
    }

    const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
    const topLinks = links
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
      .map((l) => ({ id: l.id, title: l.title, clicks: l.clicks }));

    res.json({
      totalViews: user.viewCount,
      totalClicks,
      viewsLast30Days: last30Views.length,
      clicksLast30Days: last30Clicks.length,
      viewsByDay: days,
      topLinks,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get analytics");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/payments/paypal/create-order", requireAuth, async (req, res) => {
  try {
    const result = await createOrder();
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to create PayPal order");
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.post("/payments/paypal/capture-order", requireAuth, async (req, res) => {
  try {
    const { orderId } = req.body as { orderId: string };
    const success = await captureOrder(orderId);

    if (!success) {
      res.status(400).json({ error: "Payment capture failed" });
      return;
    }

    await db.update(usersTable).set({ isPremium: true }).where(eq(usersTable.id, req.userId!));

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, req.userId!),
    });

    const domain = process.env.APP_DOMAIN ?? "https://yourdomain.com";
    res.json({
      id: user!.id,
      username: user!.username,
      displayName: user!.displayName,
      email: user!.email,
      avatarUrl: user!.avatarUrl,
      bio: user!.bio,
      isPremium: user!.isPremium,
      isVerified: user!.isVerified,
      createdAt: user!.createdAt.toISOString(),
      profileUrl: `${domain}/${user!.username}`,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to capture PayPal order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export { ensureUserExists };
export default router;
