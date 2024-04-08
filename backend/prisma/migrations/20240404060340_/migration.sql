/*
  Warnings:

  - You are about to drop the `_HouseToVisiteur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HouseToVisiteur" DROP CONSTRAINT "_HouseToVisiteur_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseToVisiteur" DROP CONSTRAINT "_HouseToVisiteur_B_fkey";

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "visiteurId" DROP NOT NULL;

-- DropTable
DROP TABLE "_HouseToVisiteur";

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
