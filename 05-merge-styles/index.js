function writeStream(folder, outputFile) {
  const output = fs.createWriteStream(outputFile);
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      url = folder + file.name;
      const input = fs.createReadStream(url, "utf-8");
      if (path.extname(file.name).slice(1) == "css") {
        input.on("data", (chunk) => output.write(chunk));
        input.on("error", (error) => console.log("Error", error.message));
      }
    });
  });
}

const fs = require("fs");
const path = require("path");

const mainFolder = "./05-merge-styles/styles/";
const outputFile = "./05-merge-styles/project-dist/bundle.css";

writeStream(mainFolder, outputFile);