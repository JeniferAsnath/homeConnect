/*
  Warnings:

  - You are about to drop the column `houseId` on the `Visiteur` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_visiteurId_fkey";

-- AlterTable
ALTER TABLE "Visiteur" DROP COLUMN "houseId";

-- CreateTable
CREATE TABLE "_VisiteursDeLaMaison" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VisiteursDeLaMaison_AB_unique" ON "_VisiteursDeLaMaison"("A", "B");

-- CreateIndex
CREATE INDEX "_VisiteursDeLaMaison_B_index" ON "_VisiteursDeLaMaison"("B");

-- AddForeignKey
ALTER TABLE "_VisiteursDeLaMaison" ADD CONSTRAINT "_VisiteursDeLaMaison_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisiteursDeLaMaison" ADD CONSTRAINT "_VisiteursDeLaMaison_B_fkey" FOREIGN KEY ("B") REFERENCES "Visiteur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
