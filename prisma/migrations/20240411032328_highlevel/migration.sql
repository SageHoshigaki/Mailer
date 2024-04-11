-- CreateTable
CREATE TABLE "UserMailService" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "document" STRING NOT NULL,
    "To_DebtCollectorName" STRING NOT NULL,
    "To_DebtCollectorAddress" STRING NOT NULL,
    "To_DebtCollectorCity" STRING NOT NULL,
    "To_DebtCollectorState" STRING NOT NULL,
    "To_DebtCollectorZipCode" STRING NOT NULL,
    "From_ContactFullName" STRING NOT NULL,
    "From_ContactAddress" STRING NOT NULL,
    "From_ContactCity" STRING NOT NULL,
    "From_ContactState" STRING NOT NULL,
    "From_ContactZipCode" STRING NOT NULL,
    "pdfLink" STRING,

    CONSTRAINT "UserMailService_pkey" PRIMARY KEY ("id")
);
