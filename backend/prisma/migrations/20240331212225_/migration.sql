/*
  Warnings:

  - You are about to drop the column `visitorId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `visitorId` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `visitorId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Visitor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `visiteurId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Made the column `bailleurId` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `visiteurId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_bailleurId_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_userId_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "visitorId",
ADD COLUMN     "visiteurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "House" DROP COLUMN "visitorId",
ADD COLUMN     "visiteurId" INTEGER,
ALTER COLUMN "bailleurId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "visitorId",
ADD COLUMN     "visiteurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userType",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "Visitor";

-- CreateTable
CREATE TABLE "Visiteur" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Visiteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistedToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlacklistedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedToken_token_key" ON "BlacklistedToken"("token");

-- AddForeignKey
ALTER TABLE "Visiteur" ADD CONSTRAINT "Visiteur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_bailleurId_fkey" FOREIGN KEY ("bailleurId") REFERENCES "Bailleur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
