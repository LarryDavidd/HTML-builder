function callback(err) {
  if (err) throw err;
}

function copyDir(testFolder) {
  fs.readdir(testFolder, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      url = testFolder + file.name;

      fs.copyFile(url, "./04-copy-directory/files - copy/" + file.name, callback);
    });
  });
}

function removeDir() {
  fs.readdir("./04-copy-directory/files - copy/", { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      url = testFolder + file.name;

      fs.unlink("./04-copy-directory/files - copy/" + file.name, callback);
    });
  });
}

const testFolder = "./04-copy-directory/files/";
const fs = require("fs");
const path = require("path");
fs.mkdir("./04-copy-directory/files - copy", { recursive: true }, (err) => {
  if (err) throw err;
  removeDir()
  copyDir(testFolder);
});