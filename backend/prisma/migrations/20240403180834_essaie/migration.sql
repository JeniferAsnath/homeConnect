/*
  Warnings:

  - Made the column `visiteurId` on table `House` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_visiteurId_fkey";

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "visiteurId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Visiteur" ADD COLUMN     "houseId" TEXT;

-- AddForeignKey
ALTER TABLE "Visiteur" ADD CONSTRAINT "Visiteur_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;
