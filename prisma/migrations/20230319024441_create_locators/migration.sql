-- AlterTable
ALTER TABLE "users" ADD COLUMN     "surname" TEXT;

-- CreateTable
CREATE TABLE "locadors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locadors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locadors_phone_key" ON "locadors"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "locadors_email_key" ON "locadors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "locadors_cpf_key" ON "locadors"("cpf");

-- AddForeignKey
ALTER TABLE "locadors" ADD CONSTRAINT "locadors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
