/*
  Warnings:

  - You are about to drop the column `From_ContactAddress` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `From_ContactCity` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `From_ContactFullName` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `From_ContactState` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `From_ContactZipCode` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `To_DebtCollectorAddress` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `To_DebtCollectorCity` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `To_DebtCollectorName` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `To_DebtCollectorState` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `To_DebtCollectorZipCode` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `UserMailService` table. All the data in the column will be lost.
  - You are about to drop the column `pdfLink` on the `UserMailService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserMailService" DROP COLUMN "From_ContactAddress";
ALTER TABLE "UserMailService" DROP COLUMN "From_ContactCity";
ALTER TABLE "UserMailService" DROP COLUMN "From_ContactFullName";
ALTER TABLE "UserMailService" DROP COLUMN "From_ContactState";
ALTER TABLE "UserMailService" DROP COLUMN "From_ContactZipCode";
ALTER TABLE "UserMailService" DROP COLUMN "To_DebtCollectorAddress";
ALTER TABLE "UserMailService" DROP COLUMN "To_DebtCollectorCity";
ALTER TABLE "UserMailService" DROP COLUMN "To_DebtCollectorName";
ALTER TABLE "UserMailService" DROP COLUMN "To_DebtCollectorState";
ALTER TABLE "UserMailService" DROP COLUMN "To_DebtCollectorZipCode";
ALTER TABLE "UserMailService" DROP COLUMN "document";
ALTER TABLE "UserMailService" DROP COLUMN "pdfLink";
ALTER TABLE "UserMailService" ADD COLUMN     "Contact_FromSenderCity" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "Contact_TypeofMail" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_FromSenderAddress" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_FromSenderName" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_FromSenderState" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_FromSenderZipCode" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_ToReceiverAddress" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_ToReceiverCity" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_ToReceiverState" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_ToReceiverZipCode" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_paperSize" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "contact_sendDate" TIMESTAMP(3);
ALTER TABLE "UserMailService" ADD COLUMN     "contact_toReceiverName" STRING;
ALTER TABLE "UserMailService" ADD COLUMN     "document_url" STRING;
