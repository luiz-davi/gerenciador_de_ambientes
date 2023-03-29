-- DropForeignKey
ALTER TABLE "renters" DROP CONSTRAINT "renters_user_id_fkey";

-- AddForeignKey
ALTER TABLE "renters" ADD CONSTRAINT "renters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
