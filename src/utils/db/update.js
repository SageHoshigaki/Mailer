const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updatePdfLink(entryId, fileUrl) {
  try {
    const updatedDocument = await prisma.userMailService.update({
      where: {
        id: entryId,
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
