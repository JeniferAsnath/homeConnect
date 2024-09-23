-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_visiteurId_fkey";

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "visiteurId" SET DEFAULT '';

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
ALTER TABLE "_HouseToVisiteur" ADD CONSTRAINT "_HouseToVisiteur_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToVisiteur" ADD CONSTRAINT "_HouseToVisiteur_B_fkey" FOREIGN KEY ("B") REFERENCES "Visiteur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
