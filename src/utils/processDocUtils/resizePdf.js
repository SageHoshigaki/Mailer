const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

// Function to resize a PDF to standard letter size
async function resizePDF(filePath) {
  const existingPdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pages = pdfDoc.getPages();
  pages.forEach((page) => {
    page.setSize(8.5 * 72, 11 * 72); // 8.5x11 inches in points
  });

  const pdfBytes = await pdfDoc.save();
  const newFilePath = filePath.replace(/(\.pdf)$/i, "_resized$1");
  fs.writeFileSync(newFilePath, pdfBytes);

  return newFilePath;
}

module.exports = resizePDF;
