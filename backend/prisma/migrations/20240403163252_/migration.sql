/*
  Warnings:

  - Made the column `bailleurId` on table `Images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bailleurId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_bailleurId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_bailleurId_fkey";

-- AlterTable
ALTER TABLE "Bailleur" ADD COLUMN     "houseId" TEXT NOT NULL DEFAULT 'aa';

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "bailleurId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "bailleurId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_bailleurId_fkey" FOREIGN KEY ("bailleurId") REFERENCES "Bailleur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_bailleurId_fkey" FOREIGN KEY ("bailleurId") REFERENCES "Bailleur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
