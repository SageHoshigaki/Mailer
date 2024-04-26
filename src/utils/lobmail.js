import axios from "axios";
import dotenv from "dotenv";
import { getDocumentFromDb } from "@utils/db/findDoc";

dotenv.config();

async function sendLobMail(documentId) {
  try {
    const document = await getDocumentFromDb(documentId); // Correctly call the imported function

    const formData = new URLSearchParams({
      "to[name]": document.To_DebtCollectorName.trim(),
      "to[address_line1]": document.To_DebtCollectorAddress.trim(),
      "to[address_city]": document.To_DebtCollectorCity.trim(),
      "to[address_state]": document.To_DebtCollectorState.trim(),
      "to[address_zip]": document.To_DebtCollectorZipCode.trim(),
      "from[name]": document.From_ContactFullName.trim(),
      "from[address_line1]": document.From_ContactAddress.trim(),
      "from[address_city]": document.From_ContactCity.trim(),
      "from[address_state]": document.From_ContactState.trim(),
      "from[address_zip]": document.From_ContactZipCode.trim(),
      color: "true",
      file: document.pdfLink, // Ensure the PDF link is correct
    });

    const response = await axios.post(
      "https://api.lob.com/v1/letters",
      formData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.LOB_KEY + ":"
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      console.log("Letter sent successfully.");
      return true;
    } else {
      console.error("Error sending letter:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error sending letter:", error.message);
    return false;
  }
}

export default sendLobMail;
