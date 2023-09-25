const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCode = (language, filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.txt`);

  return new Promise((resolve, reject) => {
    let command = "";
    switch (language.toLowerCase()) {
      case "python":
        command = `python3 ${filepath}`;
        break;
      case "cpp":
        command = `g++ ${filepath} -o ${outPath} && ${outPath}`;
        break;
      default:
        return reject("Unsupported language");
    }

    const codeProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        fs.writeFileSync(outPath, stdout, "utf-8");
        resolve(outPath);
      }
    });
  });
};

module.exports = {
  executeCode,
};
