import { pgTable, text, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profileViewsTable = pgTable("profile_views", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).notNull().defaultNow(),
  viewDate: date("view_date", { mode: "string" }).notNull(),
  ipHash: text("ip_hash"),
});

export const linkClicksTable = pgTable("link_clicks", {
  id: text("id").primaryKey(),
  linkId: text("link_id").notNull(),
  userId: text("user_id").notNull(),
  clickedAt: timestamp("clicked_at", { withTimezone: true }).notNull().defaultNow(),
  clickDate: date("click_date", { mode: "string" }).notNull(),
});

export const insertProfileViewSchema = createInsertSchema(profileViewsTable);
export type InsertProfileView = z.infer<typeof insertProfileViewSchema>;
export type ProfileView = typeof profileViewsTable.$inferSelect;

export const insertLinkClickSchema = createInsertSchema(linkClicksTable);
export type InsertLinkClick = z.infer<typeof insertLinkClickSchema>;
export type LinkClick = typeof linkClicksTable.$inferSelect;
