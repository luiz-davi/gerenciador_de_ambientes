-- AlterTable
ALTER TABLE "environments" ADD COLUMN     "grill" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kitchen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playground" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pool" BOOLEAN NOT NULL DEFAULT false;
