import axios from "axios";
import dotenv from "dotenv";
import { getDocumentFromDb } from "@utils/db/findDoc";

dotenv.config();

async function sendLobMail(documentId) {
  try {
    // Retrieve the document from the database
    const document = await getDocumentFromDb(documentId);

    // Log the retrieved document for debugging
    console.log("Retrieved document:", document);

    // Ensure all properties are defined and trimmed
    const toName = document.To_DebtCollectorName
      ? document.To_DebtCollectorName.trim()
      : "No Name";
    const toAddress = document.To_DebtCollectorAddress
      ? document.To_DebtCollectorAddress.trim()
      : "No Address";
    const toCity = document.To_DebtCollectorCity
      ? document.To_DebtCollectorCity.trim()
      : "No City";
    const toState = document.To_DebtCollectorState
      ? document.To_DebtCollectorState.trim()
      : "No State";
    const toZip = document.To_DebtCollectorZipCode
      ? document.To_DebtCollectorZipCode.trim()
      : "No Zip";
    const fromName = document.From_ContactFullName
      ? document.From_ContactFullName.trim()
      : "No Name";
    const fromAddress = document.From_ContactAddress
      ? document.From_ContactAddress.trim()
      : "No Address";
    const fromCity = document.From_ContactCity
      ? document.From_ContactCity.trim()
      : "No City";
    const fromState = document.From_ContactState
      ? document.From_ContactState.trim()
      : "No State";
    const fromZip = document.From_ContactZipCode
      ? document.From_ContactZipCode.trim()
      : "No Zip";

    // Construct the form data
    const formData = new URLSearchParams({
      "to[name]": toName,
      "to[address_line1]": toAddress,
      "to[address_city]": toCity,
      "to[address_state]": toState,
      "to[address_zip]": toZip,
      "from[name]": fromName,
      "from[address_line1]": fromAddress,
      "from[address_city]": fromCity,
      "from[address_state]": fromState,
      "from[address_zip]": fromZip,
      color: "true",
      file: document.pdfLink || "", // Ensure the PDF link is provided
    });

    // Log the form data for debugging
    console.log("Form data:", formData.toString());

    // Send the request to the Lob API
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

    // Check the response status
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
