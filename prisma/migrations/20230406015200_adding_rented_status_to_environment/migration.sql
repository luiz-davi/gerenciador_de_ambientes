/*
  Warnings:

  - You are about to drop the column `hours` on the `Rent` table. All the data in the column will be lost.
  - Added the required column `end` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rent" DROP COLUMN "hours",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "environments" ADD COLUMN     "rented" BOOLEAN NOT NULL DEFAULT false;
