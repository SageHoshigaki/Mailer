/*
  Warnings:

  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "access_token" STRING;
ALTER TABLE "Account" ADD COLUMN     "expires_at" INT4;
ALTER TABLE "Account" ADD COLUMN     "id_token" STRING;
ALTER TABLE "Account" ADD COLUMN     "scope" STRING;
ALTER TABLE "Account" ADD COLUMN     "token_type" STRING;
ALTER TABLE "Account" ADD COLUMN     "type" STRING NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
