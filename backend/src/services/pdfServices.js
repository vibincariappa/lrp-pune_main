const fs = require("fs");
const pdfParse = require("pdf-parse");

const parsePdf =
async(filePath)=>{

    const buffer =
        fs.readFileSync(filePath);

    const pdfData =
        await pdfParse(buffer);

    return pdfData.text;

};

module.exports = {
    parsePdf
};