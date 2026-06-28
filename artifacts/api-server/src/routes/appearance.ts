import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, appearancesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/users/me/appearance", requireAuth, async (req, res) => {
  try {
    let appearance = await db.query.appearancesTable.findFirst({
      where: eq(appearancesTable.userId, req.userId!),
    });

    if (!appearance) {
      const [created] = await db
        .insert(appearancesTable)
        .values({
          userId: req.userId!,
          theme: "dark",
          backgroundType: "color",
          fontFamily: "Inter",
          buttonStyle: "rounded",
          showBadge: true,
          glowEffect: false,
          animatedBackground: false,
        })
        .returning();
      appearance = created;
    }

    res.json({
      userId: appearance.userId,
      theme: appearance.theme,
      backgroundColor: appearance.backgroundColor,
      backgroundGradient: appearance.backgroundGradient,
      backgroundImageUrl: appearance.backgroundImageUrl,
      backgroundType: appearance.backgroundType,
      fontFamily: appearance.fontFamily,
      textColor: appearance.textColor,
      accentColor: appearance.accentColor,
      buttonStyle: appearance.buttonStyle,
      showBadge: appearance.showBadge,
      glowEffect: appearance.glowEffect,
      animatedBackground: appearance.animatedBackground,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get appearance");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/me/appearance", requireAuth, async (req, res) => {
  try {
    const body = req.body as {
      theme?: string;
      backgroundColor?: string;
      backgroundGradient?: string;
      backgroundImageUrl?: string;
      backgroundType?: string;
      fontFamily?: string;
      textColor?: string;
      accentColor?: string;
      buttonStyle?: string;
      showBadge?: boolean;
      glowEffect?: boolean;
      animatedBackground?: boolean;
    };

    const existing = await db.query.appearancesTable.findFirst({
      where: eq(appearancesTable.userId, req.userId!),
    });

    const updates: Partial<typeof appearancesTable.$inferInsert> = {};
    if (body.theme !== undefined) updates.theme = body.theme;
    if (body.backgroundColor !== undefined) updates.backgroundColor = body.backgroundColor;
    if (body.backgroundGradient !== undefined) updates.backgroundGradient = body.backgroundGradient;
    if (body.backgroundImageUrl !== undefined) updates.backgroundImageUrl = body.backgroundImageUrl;
    if (body.backgroundType !== undefined) updates.backgroundType = body.backgroundType;
    if (body.fontFamily !== undefined) updates.fontFamily = body.fontFamily;
    if (body.textColor !== undefined) updates.textColor = body.textColor;
    if (body.accentColor !== undefined) updates.accentColor = body.accentColor;
    if (body.buttonStyle !== undefined) updates.buttonStyle = body.buttonStyle;
    if (body.showBadge !== undefined) updates.showBadge = body.showBadge;
    if (body.glowEffect !== undefined) updates.glowEffect = body.glowEffect;
    if (body.animatedBackground !== undefined) updates.animatedBackground = body.animatedBackground;

    let appearance;
    if (!existing) {
      const [created] = await db
        .insert(appearancesTable)
        .values({
          userId: req.userId!,
          theme: body.theme ?? "dark",
          backgroundType: body.backgroundType ?? "color",
          fontFamily: body.fontFamily ?? "Inter",
          buttonStyle: body.buttonStyle ?? "rounded",
          showBadge: body.showBadge ?? true,
          glowEffect: body.glowEffect ?? false,
          animatedBackground: body.animatedBackground ?? false,
          ...updates,
        })
        .returning();
      appearance = created;
    } else {
      const [updated] = await db
        .update(appearancesTable)
        .set(updates)
        .where(eq(appearancesTable.userId, req.userId!))
        .returning();
      appearance = updated;
    }

    res.json({
      userId: appearance.userId,
      theme: appearance.theme,
      backgroundColor: appearance.backgroundColor,
      backgroundGradient: appearance.backgroundGradient,
      backgroundImageUrl: appearance.backgroundImageUrl,
      backgroundType: appearance.backgroundType,
      fontFamily: appearance.fontFamily,
      textColor: appearance.textColor,
      accentColor: appearance.accentColor,
      buttonStyle: appearance.buttonStyle,
      showBadge: appearance.showBadge,
      glowEffect: appearance.glowEffect,
      animatedBackground: appearance.animatedBackground,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update appearance");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
