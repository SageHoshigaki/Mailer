// Update the MailData in CorckroachDB
async function updateDatabaseWithPdfLink(entryId, pdfLink) {
  await prisma.userMailService.update({
    where: { id: entryId },
    data: { pdfLink },
  });
}

module.exports = updateDatabaseWithPdfLink;
