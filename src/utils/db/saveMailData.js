import prisma from "@utils/db/prisma";

const saveMailData = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("❌ No valid data provided to saveMailData.");
  }

  console.log("📩 Saving mail data with:", data);

  // Ensure all required fields are present
  const requiredFields = [
    "contact_toReceiverName",
    "contact_ToReceiverAddress",
    "contact_ToReceiverCity",
    "contact_ToReceiverState",
    "contact_ToReceiverZipCode",
    "contact_FromSenderName",
    "contact_FromSenderAddress",
    "contact_FromSenderCity",
    "contact_FromSenderState",
    "contact_FromSenderZipCode",
    "contact_sendDate",
    "contact_TypeofMail",
    "contact_paperSize",
    "document_url",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`❌ Missing required field: ${field}`);
    }
  }

  try {
    const savedData = await prisma.userMailService.create({
      data,
    });

    console.log("✅ Mail data successfully saved:", savedData);

    return {
      id: savedData.id.toString(),
      document: savedData.document_url,
    };
  } catch (error) {
    console.error("❌ Prisma Error saving mail data:", error);
    throw new Error(`❌ Database error: ${error.message}`);
  }
};

export default saveMailData;
