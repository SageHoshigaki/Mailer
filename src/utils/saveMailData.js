import prisma from "@utils/prisma";

// Script To Process Incoming Users Save And Sanitize Data
const saveMailData = async (req) => {
  const { MailData } = req.body;
  if (!MailData) {
    throw new Error("MailData is missing from the request body");
  }

  try {
    const savedData = await prisma.userMailService.create({
      data: { ...MailData },
    });

    // Attach the saved data ID to the request object for the next middleware
    req.savedData = {
      document: savedData.document,
      id: savedData.id.toString(),
    };
  } catch (error) {
    console.error("Error saving mail data:", error);
    throw new Error(error.message); // Now throws to be caught by the calling function
  }
};

export default saveMailData;
