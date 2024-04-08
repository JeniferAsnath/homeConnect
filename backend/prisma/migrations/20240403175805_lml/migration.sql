-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_visiteurId_fkey";

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "visiteurId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
