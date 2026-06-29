import { Router, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, linksTable, appearancesTable, profileViewsTable, linkClicksTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { generateId, getTodayDate } from "../lib/id";

const router = Router();

router.get("/profiles/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, username),
    });

    if (!user) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    const links = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, user.id))
      .orderBy(linksTable.order);

    const appearance = await db.query.appearancesTable.findFirst({
      where: eq(appearancesTable.userId, user.id),
    });

    const defaultAppearance = {
      userId: user.id,
      theme: "dark",
      backgroundColor: null,
      backgroundGradient: null,
      backgroundImageUrl: null,
      backgroundType: "color",
      fontFamily: "Inter",
      textColor: null,
      accentColor: null,
      buttonStyle: "rounded",
      showBadge: true,
      glowEffect: false,
      animatedBackground: false,
    };

    res.json({
      username: user.username,
      displayName: user.displayName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      isPremium: user.isPremium,
      isVerified: user.isVerified,
      appearance: appearance ?? defaultAppearance,
      links: links
        .filter((l: any) => l.isVisible) // Fixed implicit any
        .map((l: any) => ({              // Fixed implicit any
          id: l.id,
          title: l.title,
          url: l.url,
          icon: l.icon,
          clicks: l.clicks,
        })),
      viewCount: user.viewCount,
    });
  } catch (err: any) { // Fixed implicit any
    req.log.error({ err }, "Failed to get public profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/profiles/:username/view", async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, username),
    });

    if (!user) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    const today = getTodayDate();

    await Promise.all([
      db.insert(profileViewsTable).values({
        id: generateId(),
        userId: user.id,
        viewDate: today,
      }),
      db
        .update(usersTable)
        .set({ viewCount: user.viewCount + 1 })
        .where(eq(usersTable.id, user.id)),
    ]);

    res.json({ success: true, message: null });
  } catch (err: any) { // Fixed implicit any
    req.log.error({ err }, "Failed to record profile view");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/links/:id/click", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const link = await db.query.linksTable.findFirst({
      where: eq(linksTable.id, id),
    });

    if (!link) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    const today = getTodayDate();

    await Promise.all([
      db.insert(linkClicksTable).values({
        id: generateId(),
        linkId: id,
        userId: link.userId,
        clickDate: today,
      }),
      db
        .update(linksTable)
        .set({ clicks: link.clicks + 1 })
        .where(eq(linksTable.id, id)),
    ]);

    res.json({ success: true, message: null });
  } catch (err: any) { // Fixed implicit any
    req.log.error({ err }, "Failed to record link click");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/check-username/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;
    const normalized = username.toLowerCase().trim();

    const reserved = ["admin", "api", "dashboard", "login", "register", "upgrade", "settings", "help", "support", "about", "terms", "privacy", "blog"];
    if (reserved.includes(normalized)) {
      res.json({ available: false, username: normalized });
      return;
    }

    const existing = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, normalized),
    });

    res.json({ available: !existing, username: normalized });
  } catch (err: any) { // Fixed implicit any
    req.log.error({ err }, "Failed to check username");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
