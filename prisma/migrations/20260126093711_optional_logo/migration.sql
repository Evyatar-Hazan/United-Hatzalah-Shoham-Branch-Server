-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Donor" ("category", "createdAt", "id", "logo", "name", "updatedAt") SELECT "category", "createdAt", "id", "logo", "name", "updatedAt" FROM "Donor";
DROP TABLE "Donor";
ALTER TABLE "new_Donor" RENAME TO "Donor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
