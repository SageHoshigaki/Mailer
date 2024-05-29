// Update the MailData in CorckroachDB
async function updateDatabaseWithPdfLink(entryId, pdfLink) {
  const intEntryId = parseInt(entryId, 10);

  if (isNaN(intEntryId)) {
    throw new Error(`Invalid entryId: ${entryId}`);
  }

  await prisma.userMailService.update({
    where: { id: intEntryId },
    data: { pdfLink },
  });
}

module.exports = updateDatabaseWithPdfLink;
