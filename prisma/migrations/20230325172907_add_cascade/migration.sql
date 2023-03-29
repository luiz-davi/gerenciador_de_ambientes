-- DropForeignKey
ALTER TABLE "environments" DROP CONSTRAINT "environments_locator_id_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_environment_id_fkey";

-- AddForeignKey
ALTER TABLE "environments" ADD CONSTRAINT "environments_locator_id_fkey" FOREIGN KEY ("locator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
