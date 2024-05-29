const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updatePdfLink(entryId, fileUrl) {
  try {
    // Parse entryId as an integer
    const intEntryId = parseInt(entryId, 10);

    if (isNaN(intEntryId)) {
      throw new Error(`Invalid entryId: ${entryId}`);
    }

    const updatedDocument = await prisma.userMailService.update({
      where: {
        id: intEntryId,
      },
      data: {
        pdfLink: fileUrl,
      },
    });

    console.log("Updated document:", updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error("Failed to update document:", error);
    throw error;
  }
}

module.exports = updatePdfLink;
