import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const appearancesTable = pgTable("appearances", {
  userId: text("user_id").primaryKey(),
  theme: text("theme").notNull().default("dark"),
  backgroundColor: text("background_color"),
  backgroundGradient: text("background_gradient"),
  backgroundImageUrl: text("background_image_url"),
  backgroundType: text("background_type").notNull().default("color"),
  fontFamily: text("font_family").notNull().default("Inter"),
  textColor: text("text_color"),
  accentColor: text("accent_color"),
  buttonStyle: text("button_style").notNull().default("rounded"),
  showBadge: boolean("show_badge").notNull().default(true),
  glowEffect: boolean("glow_effect").notNull().default(false),
  animatedBackground: boolean("animated_background").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertAppearanceSchema = createInsertSchema(appearancesTable).omit({ updatedAt: true });
export type InsertAppearance = z.infer<typeof insertAppearanceSchema>;
export type Appearance = typeof appearancesTable.$inferSelect;
