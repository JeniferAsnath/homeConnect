/*
  Warnings:

  - You are about to drop the column `buyerId` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfRooms` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `phoneNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bathrooms` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_userId_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_buyerId_fkey";

-- AlterTable
ALTER TABLE "House" DROP COLUMN "buyerId",
DROP COLUMN "numberOfRooms",
DROP COLUMN "price",
ADD COLUMN     "bailleurId" INTEGER,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "rent" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "buyerId",
ADD COLUMN     "bailleurId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Buyer";

-- CreateTable
CREATE TABLE "Bailleur" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Bailleur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "houseId" INTEGER NOT NULL,
    "bailleurId" INTEGER,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Bailleur" ADD CONSTRAINT "Bailleur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_bailleurId_fkey" FOREIGN KEY ("bailleurId") REFERENCES "Bailleur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_bailleurId_fkey" FOREIGN KEY ("bailleurId") REFERENCES "Bailleur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_bailleurId_fkey" FOREIGN KEY ("bailleurId") REFERENCES "Bailleur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
