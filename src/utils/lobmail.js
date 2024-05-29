import axios from "axios";
import dotenv from "dotenv";
import { getDocumentFromDb } from "@utils/db/findDoc";

dotenv.config();

async function sendLobMail(documentId) {
  try {
    // Ensure documentId is parsed as an integer
    const intDocumentId = parseInt(documentId, 10);

    if (isNaN(intDocumentId)) {
      throw new Error(`Invalid documentId: ${documentId}`);
    }

    // Retrieve the document from the database using the new Int ID
    const document = await getDocumentFromDb(intDocumentId);

    // Log the retrieved document for debugging
    console.log("Retrieved document:", JSON.stringify(document, null, 2));

    // Ensure all properties are defined and trimmed
    const toName = document.contact_toReceiverName
      ? document.contact_toReceiverName.trim()
      : "No Name";
    const toAddress = document.contact_ToReceiverAddress
      ? document.contact_ToReceiverAddress.trim()
      : "No Address";
    const toCity = document.contact_ToReceiverCity
      ? document.contact_ToReceiverCity.trim()
      : "No City";
    const toState = document.contact_ToReceiverState
      ? document.contact_ToReceiverState.trim()
      : "No State";
    const toZip = document.contact_ToReceiverZipCode
      ? document.contact_ToReceiverZipCode.trim()
      : "No Zip";
    const fromName = document.contact_FromSenderName
      ? document.contact_FromSenderName.trim()
      : "No Name";
    const fromAddress = document.contact_FromSenderAddress
      ? document.contact_FromSenderAddress.trim()
      : "No Address";
    const fromCity = document.Contact_FromSenderCity
      ? document.Contact_FromSenderCity.trim()
      : "No City";
    const fromState = document.contact_FromSenderState
      ? document.contact_FromSenderState.trim()
      : "No State";
    const fromZip = document.contact_FromSenderZipCode
      ? document.contact_FromSenderZipCode.trim()
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
