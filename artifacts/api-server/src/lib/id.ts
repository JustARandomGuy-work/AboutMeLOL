import { randomUUID } from "crypto";

export function generateId(): string {
  return randomUUID();
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}
