const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");
const fs = require("fs");
const path = require("path");

function generateDocx() {
  const mdPath = path.join(__dirname, "template_2.md");
  if (!fs.existsSync(mdPath)) {
    console.error("No se encontró template_2.md en la ruta del proyecto.");
    return;
  }

  const content = fs.readFileSync(mdPath, "utf8");
  const lines = content.split(/\r?\n/);
  const docChildren = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Handle horizontal rules or separators
    if (line.trim() === "---") {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "──────────────────────────────────────────────────",
              color: "CCCCCC",
            }),
          ],
          spacing: { before: 200, after: 200 },
        })
      );
      continue;
    }

    // Determine heading levels
    let headingLevel = null;
    let isBold = false;
    let size = 22; // Default size (11pt in docx is 22 half-points)
    let textColor = "333333";

    if (line.startsWith("# ")) {
      headingLevel = HeadingLevel.HEADING_1;
      line = line.substring(2);
      isBold = true;
      size = 32; // 16pt
      textColor = "0D9488"; // Teal-600
    } else if (line.startsWith("## ")) {
      headingLevel = HeadingLevel.HEADING_2;
      line = line.substring(3);
      isBold = true;
      size = 28; // 14pt
      textColor = "0F172A"; // Slate-900
    } else if (line.startsWith("### ")) {
      headingLevel = HeadingLevel.HEADING_3;
      line = line.substring(4);
      isBold = true;
      size = 24; // 12pt
      textColor = "0F172A"; // Slate-900
    } else if (line.startsWith("#### ")) {
      headingLevel = HeadingLevel.HEADING_4;
      line = line.substring(5);
      isBold = true;
      size = 22; // 11pt
      textColor = "0F172A";
    }

    // Parse the line for placeholders [like this] to color them in orange and underline
    const runs = [];
    const placeholderRegex = /\[[^\]]+\]/g;
    let lastIndex = 0;
    let match;

    while ((match = placeholderRegex.exec(line)) !== null) {
      const textBefore = line.substring(lastIndex, match.index);
      if (textBefore) {
        runs.push(
          new TextRun({
            text: textBefore,
            bold: isBold,
            size: size,
            color: textColor,
          })
        );
      }

      // Add the placeholder with orange and underline
      runs.push(
        new TextRun({
          text: match[0],
          bold: true,
          underline: {},
          color: "FF6B00", // Bright Orange
          size: size,
        })
      );

      lastIndex = placeholderRegex.lastIndex;
    }

    const textRemaining = line.substring(lastIndex);
    if (textRemaining || runs.length === 0) {
      runs.push(
        new TextRun({
          text: textRemaining || "",
          bold: isBold,
          size: size,
          color: textColor,
        })
      );
    }

    // Add spacing after paragraph
    docChildren.push(
      new Paragraph({
        heading: headingLevel || undefined,
        children: runs,
        spacing: { after: headingLevel ? 200 : 120 },
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    const docxPath = path.join(__dirname, "template_2.docx");
    fs.writeFileSync(docxPath, buffer);
    console.log(`Documento de Word generado con éxito en: ${docxPath}`);
  }).catch((err) => {
    console.error("Error al empaquetar el documento DOCX:", err);
  });
}

generateDocx();
