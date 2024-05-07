/*
  Warnings:

  - Made the column `Contact_FromSenderCity` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Contact_TypeofMail` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_FromSenderAddress` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_FromSenderName` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_FromSenderState` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_FromSenderZipCode` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_ToReceiverAddress` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_ToReceiverCity` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_ToReceiverState` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_ToReceiverZipCode` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_paperSize` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_sendDate` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_toReceiverName` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `document_url` on table `UserMailService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserMailService" ADD COLUMN     "pdfLink" STRING;
ALTER TABLE "UserMailService" ALTER COLUMN "Contact_FromSenderCity" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "Contact_TypeofMail" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_FromSenderAddress" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_FromSenderName" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_FromSenderState" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_FromSenderZipCode" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_ToReceiverAddress" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_ToReceiverCity" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_ToReceiverState" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_ToReceiverZipCode" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_paperSize" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_sendDate" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "contact_toReceiverName" SET NOT NULL;
ALTER TABLE "UserMailService" ALTER COLUMN "document_url" SET NOT NULL;
