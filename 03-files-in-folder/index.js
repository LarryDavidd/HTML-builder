function copyDir(testFolder) {
  fs.readdir(testFolder, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      url = testFolder + "\\" + file.name;

      if (file.isFile()) {
        fs.stat(url, (e, statfile) => {
          if (e) {
            console.log(e);
          } else {
            console.log(
              path.parse(file.name).name +
                " - " +
                path.extname(file.name).slice(1) +
                " - " +
                statfile.size +
                "b" +
                "\n"
            );
          }
        });
      };
    });
  });
}

const testFolder = "./03-files-in-folder/secret-folder/";
const fs = require("fs");
const path = require("path");

copyDir(testFolder);