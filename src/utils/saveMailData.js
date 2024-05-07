import prisma from "@utils/prisma";

// Function to process incoming mail data and save it to the database
const saveMailData = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  try {
    const savedData = await prisma.userMailService.create({
      data: {
        ...data, // directly spreading the data assuming all names match exactly
      },
    });

    // Return the saved data ID and document for further processing
    return {
      id: savedData.id.toString(),
      document: savedData.document_url,
    };
  } catch (error) {
    console.error("Error saving mail data:", error);
    throw error; // Re-throwing the original error to preserve the stack trace
  }
};

export default saveMailData;
