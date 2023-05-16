/*
  Warnings:

  - Added the required column `email` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Guestbook` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "guestbookId" INTEGER NOT NULL,
    CONSTRAINT "Entry_guestbookId_fkey" FOREIGN KEY ("guestbookId") REFERENCES "Guestbook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("guestbookId", "id", "message", "name") SELECT "guestbookId", "id", "message", "name" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE UNIQUE INDEX "Entry_name_key" ON "Entry"("name");
CREATE TABLE "new_Guestbook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Guestbook" ("id", "name") SELECT "id", "name" FROM "Guestbook";
DROP TABLE "Guestbook";
ALTER TABLE "new_Guestbook" RENAME TO "Guestbook";
CREATE UNIQUE INDEX "Guestbook_name_key" ON "Guestbook"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
