import { Router } from "express";
import { eq, asc } from "drizzle-orm";
import { db, linksTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { generateId } from "../lib/id";

const router = Router();

router.get("/users/me/links", requireAuth, async (req, res) => {
  try {
    const links = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, req.userId!))
      .orderBy(asc(linksTable.order));

    res.json(links.map((l) => ({
      id: l.id,
      userId: l.userId,
      title: l.title,
      url: l.url,
      icon: l.icon,
      order: l.order,
      isVisible: l.isVisible,
      clicks: l.clicks,
      createdAt: l.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get links");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/me/links", requireAuth, async (req, res) => {
  try {
    const { title, url, icon } = req.body as { title: string; url: string; icon?: string };

    const existing = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, req.userId!));

    const maxOrder = existing.length > 0 ? Math.max(...existing.map((l) => l.order)) : -1;

    const [link] = await db.insert(linksTable).values({
      id: generateId(),
      userId: req.userId!,
      title,
      url,
      icon: icon ?? null,
      order: maxOrder + 1,
      isVisible: true,
      clicks: 0,
    }).returning();

    res.status(201).json({
      id: link.id,
      userId: link.userId,
      title: link.title,
      url: link.url,
      icon: link.icon,
      order: link.order,
      isVisible: link.isVisible,
      clicks: link.clicks,
      createdAt: link.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create link");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/me/links/reorder", requireAuth, async (req, res) => {
  try {
    const { ids } = req.body as { ids: string[] };

    await Promise.all(
      ids.map((id, index) =>
        db.update(linksTable).set({ order: index }).where(eq(linksTable.id, id))
      )
    );

    res.json({ success: true, message: null });
  } catch (err) {
    req.log.error({ err }, "Failed to reorder links");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/me/links/:id", requireAuth, async (req, res) => {
  try {
    const id = String(req.params["id"]);
    const { title, url, icon, isVisible } = req.body as {
      title?: string;
      url?: string;
      icon?: string;
      isVisible?: boolean;
    };

    const link = await db.query.linksTable.findFirst({
      where: eq(linksTable.id, id),
    });

    if (!link || link.userId !== req.userId) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    const updates: Partial<typeof linksTable.$inferInsert> = {};
    if (title !== undefined) updates.title = title;
    if (url !== undefined) updates.url = url;
    if (icon !== undefined) updates.icon = icon;
    if (isVisible !== undefined) updates.isVisible = isVisible;

    const [updated] = await db
      .update(linksTable)
      .set(updates)
      .where(eq(linksTable.id, id))
      .returning();

    res.json({
      id: updated.id,
      userId: updated.userId,
      title: updated.title,
      url: updated.url,
      icon: updated.icon,
      order: updated.order,
      isVisible: updated.isVisible,
      clicks: updated.clicks,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update link");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/users/me/links/:id", requireAuth, async (req, res) => {
  try {
    const id = String(req.params["id"]);

    const link = await db.query.linksTable.findFirst({
      where: eq(linksTable.id, id),
    });

    if (!link || link.userId !== req.userId) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    await db.delete(linksTable).where(eq(linksTable.id, id));

    res.json({ success: true, message: null });
  } catch (err) {
    req.log.error({ err }, "Failed to delete link");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
