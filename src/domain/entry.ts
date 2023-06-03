import crypto from "crypto";

export function createEntryImageUrl(path: string, baseUrl?: string) {
  if (!baseUrl) {
    throw new Error("baseUrl is required");
  }
  return `${baseUrl}/storage/v1/object/public/guestbook_entries_photos/${path}`;
}

export function createEntryImagePath(guestbookId: number, email: string) {
  const hash = crypto.randomBytes(16).toString("hex");
  return `photos/${guestbookId}-${email}-${hash}.png`;
}
