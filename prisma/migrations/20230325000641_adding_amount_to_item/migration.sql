/*
  Warnings:

  - Added the required column `amount` to the `itens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itens" ADD COLUMN     "amount" INTEGER NOT NULL;
