// const fs = require("fs");
// const path = require("path");
// const { v4: uuid } = require("uuid");

// const dirCodes = path.join(__dirname, "codes");

// if (!fs.existsSync(dirCodes)) {
//   fs.mkdirSync(dirCodes, { recursive: true });
// }

// const generateFile = async (language, code) => {
//   const jobId = uuid();
//   const fileName = `${jobId}.${language}`;

//   const filePath = path.join(dirCodes, fileName);
//   await fs.writeFileSync(filePath, code);
//   return filePath;
// };

// module.exports = {
//   generateFile,
// };

const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    return filePath;
};

module.exports = {
    generateFile,
};