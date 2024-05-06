import prisma from "@utils/prisma";

// Script to process incoming mail data and save it to the database
const saveMailData = async (req) => {
  const { data } = req.body;
  if (!data) {
    throw new Error("No data provided in the request body");
  }

  try {
    const savedData = await prisma.userMailService.create({
      data: {
        ...data, // directly spreading the data assuming all names match exactly
      },
    });

    // Optionally, attach the saved data ID to the request object for further processing
    req.savedData = {
      id: savedData.id.toString(),
      document: savedData.document_url,
    };
  } catch (error) {
    console.error("Error saving mail data:", error);
    throw new Error(error.message);
  }
};

export default saveMailData;
