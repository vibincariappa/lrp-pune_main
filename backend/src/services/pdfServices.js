const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const parsePdf =
async(filePath)=>{

    const buffer =
        fs.readFileSync(filePath);

    const parser = new PDFParse(new Uint8Array(buffer));
    const pdfData =
        await parser.getText();

    return pdfData.text;

};

module.exports = {
    parsePdf
};