import { prisma } from "./prisma";

// Script To Process Incoming Users Save And Sanitize Data
const saveMailData = async (req, res, next) => {
  const { MailData } = req.body;
  if (!MailData) {
    return res.status(400).json({
      success: false,
      error: "MailData is missing from the request body",
    });
  }

  try {
    const savedData = await prisma.userMailService.create({
      data: { ...MailData },
    });
    console.log("Data saved:", savedData);

    res
      .status(200)
      .json({ success: true, message: "MailData saved successfully" });
    // Attach the saved data ID to the request object for the next middleware
    return { document: savedData.document, id: savedData.id };
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = saveMailData;
