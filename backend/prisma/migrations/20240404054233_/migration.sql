/*
  Warnings:

  - Made the column `houseId` on table `Bailleur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `houseId` on table `Visiteur` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bailleur" ALTER COLUMN "houseId" SET NOT NULL,
ALTER COLUMN "houseId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Visiteur" ALTER COLUMN "houseId" SET NOT NULL,
ALTER COLUMN "houseId" SET DEFAULT '';
