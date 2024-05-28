import prisma from "@utils/prisma";

export async function getDocumentFromDb(documentId) {
  console.log(`Fetching document with ID: ${documentId}`);
  const document = await prisma.userMailService.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    console.error("Document not found");
    throw new Error("Document not found");
  }

  console.log("Document retrieved from DB:", JSON.stringify(document, null, 2));
  return document;
}
