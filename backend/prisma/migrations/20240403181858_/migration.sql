/*
  Warnings:

  - Made the column `houseId` on table `Visiteur` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Visiteur" DROP CONSTRAINT "Visiteur_houseId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "visiteurId" TEXT;

-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "visiteurId" TEXT;

-- AlterTable
ALTER TABLE "Visiteur" ALTER COLUMN "houseId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_HouseToVisiteur" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HouseToVisiteur_AB_unique" ON "_HouseToVisiteur"("A", "B");

-- CreateIndex
CREATE INDEX "_HouseToVisiteur_B_index" ON "_HouseToVisiteur"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToVisiteur" ADD CONSTRAINT "_HouseToVisiteur_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToVisiteur" ADD CONSTRAINT "_HouseToVisiteur_B_fkey" FOREIGN KEY ("B") REFERENCES "Visiteur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
