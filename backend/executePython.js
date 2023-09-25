const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.txt`);

  return new Promise((resolve, reject) => {
    const pythonProcess = exec(
      `python3 ${filepath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
          console.log(error);
        } else {
          console.log("stdout:", stdout);
          console.log("stderr:", stderr);
          
          fs.writeFileSync(outPath, stdout, "utf-8");
          resolve(outPath); 
        }
      }
    );
  });
};

module.exports = {
  executePython,
};
