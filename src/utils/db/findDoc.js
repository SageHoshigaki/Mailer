// getDocumentFromDb.js
import prisma from "@utils/prisma";

export async function getDocumentFromDb(documentId) {
  const document = await prisma.userMailService.findUnique({
    where: { id: documentId },
  });
  if (!document) {
    throw new Error("Document not found");
  }
  return document;
}
