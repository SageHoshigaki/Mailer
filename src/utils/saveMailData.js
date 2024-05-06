import prisma from "@utils/prisma";

// Script to process incoming mail data and save it to the database
const saveMailData = async (req) => {
  const data = req.body;
  if (!data) {
    throw new Error("No data provided in the request body");
  }

  const mailData = {
    To_DebtCollectorName: data.contact_toReceiverName,
    To_DebtCollectorAddress: data.contact_ToReceiverAddress,
    To_DebtCollectorCity: data.contact_ToReceiverCity,
    To_DebtCollectorState: data.contact_ToReceiverState,
    To_DebtCollectorZipCode: data.contact_ToReceiverZipCode,
    From_ContactFullName: data.contact_FromSenderName,
    From_ContactAddress: data.contact_FromSenderAddress,
    From_ContactCity: data.Contact_FromSenderCity,
    From_ContactState: data.contact_FromSenderState,
    From_ContactZipCode: data.contact_FromSenderZipCode,
    document: data.MailData,
    pdfLink: data.document_url,
  };

  try {
    const savedData = await prisma.userMailService.create({
      data: mailData,
    });

    // Optionally, you can attach the saved data ID to the request object for further processing
    req.savedData = {
      id: savedData.id.toString(),
      document: savedData.document,
    };
  } catch (error) {
    console.error("Error saving mail data:", error);
    throw new Error(error.message); // Now throws to be caught by the calling function
  }
};

export default saveMailData;
