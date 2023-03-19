/*
  Warnings:

  - You are about to drop the `locators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "locators" DROP CONSTRAINT "locators_user_id_fkey";

-- DropTable
DROP TABLE "locators";

-- CreateTable
CREATE TABLE "renters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "renters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "renters_phone_key" ON "renters"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "renters_email_key" ON "renters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "renters_cpf_key" ON "renters"("cpf");

-- AddForeignKey
ALTER TABLE "renters" ADD CONSTRAINT "renters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
