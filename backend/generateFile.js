const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
  const jobId = uuid();
  let fileExtension = "";

  switch (language.toLowerCase()) {
    case "python":
      fileExtension = "py";
      break;
    case "cpp":
      fileExtension = "cpp";
      break;
    default:
      throw new Error("Unsupported language");
  }

  const fileName = `${jobId}.${fileExtension}`;

  const filePath = path.join(dirCodes, fileName);
  console.log(filePath);

  await fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generateFile,
};
