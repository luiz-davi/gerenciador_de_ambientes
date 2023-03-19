-- AlterTable
ALTER TABLE "users" ADD COLUMN     "surname" TEXT;

-- CreateTable
CREATE TABLE "locators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locators_phone_key" ON "locators"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "locators_email_key" ON "locators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "locators_cpf_key" ON "locators"("cpf");

-- AddForeignKey
ALTER TABLE "locators" ADD CONSTRAINT "locators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
