/*
  Warnings:

  - You are about to drop the column `bailleurId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the `_HouseToVisiteur` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `visiteurId` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_bailleurId_fkey";

-- DropForeignKey
ALTER TABLE "_HouseToVisiteur" DROP CONSTRAINT "_HouseToVisiteur_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseToVisiteur" DROP CONSTRAINT "_HouseToVisiteur_B_fkey";

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "visiteurId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "bailleurId";

-- DropTable
DROP TABLE "_HouseToVisiteur";

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
