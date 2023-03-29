/*
  Warnings:

  - Added the required column `picture` to the `itens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itens" ADD COLUMN     "picture" TEXT NOT NULL;
