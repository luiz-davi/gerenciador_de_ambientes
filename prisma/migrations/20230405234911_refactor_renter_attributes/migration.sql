/*
  Warnings:

  - You are about to drop the column `price` on the `Rent` table. All the data in the column will be lost.
  - You are about to alter the column `hours` on the `Rent` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `total` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rent" DROP CONSTRAINT "Rent_renter_id_fkey";

-- AlterTable
ALTER TABLE "Rent" DROP COLUMN "price",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "hours" SET DATA TYPE INTEGER,
ALTER COLUMN "renter_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
