import prisma from "@utils/db/prisma";

export async function getDocumentFromDb(documentId) {
  // Parse documentId as an integer
  const intDocumentId = parseInt(documentId, 10);

  if (isNaN(intDocumentId)) {
    console.error(`Invalid documentId: ${documentId}`);
    throw new Error(`Invalid documentId: ${documentId}`);
  }

  console.log(`Fetching document with ID: ${intDocumentId}`);

  const document = await prisma.userMailService.findUnique({
    where: { id: intDocumentId },
  });

  if (!document) {
    console.error("Document not found");
    throw new Error("Document not found");
  }

  console.log("Document retrieved from DB:", JSON.stringify(document, null, 2));
  return document;
}
