-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionStart" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "subscriptionActive" SET DEFAULT false;
