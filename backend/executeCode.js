const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// const executeCode = (language, filepath) => {
//   const jobId = path.basename(filepath).split(".")[0];
//   const outPath = path.join(outputPath, `${jobId}.txt`);

//   return new Promise((resolve, reject) => {
//     let command = "";
//     switch (language.toLowerCase()) {
//       case "python":
//         command = `python3 ${filepath}`;
//         break;
//       case "cpp":
//         command = `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`;
//         break;
//       default:
//         return reject("Unsupported language");
//     }

//     const codeProcess = exec(command, (error, stdout, stderr) => {
//         if (error) {
//             reject(error);
//           } else if (stderr) {
//             reject(stderr);
//           } else {
//             resolve(stdout);
//           }
//     });
//   });
// };
const executeCode = (language, filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const executeCommands = {
      cpp: [
        `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
      ],
      py: [`python3 ${filePath}`],
    };
  
    return new Promise((resolve, reject) => {
      exec(executeCommands[language][0], (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          if (stderr) {
            reject(stderr);
          } else {
            resolve(stdout);
          }
        }
      });
    });
  };
  
  module.exports = {
    executeCode,
  };