// function callback(err) {
//   if (err) throw err;
//   console.log("file was copied");
// }

// function copyFiles(url) {
//   fs.readdir(url, { withFileTypes: true }, (err, files) => {
//     files.forEach((file) => {
//       if (file.isFile()) {
//         fs.copyFile(
//           "./" + url + "/" + file.name,
//           "./06-build-page/project-dist/" + url + "/" + file.name,
//           callback
//         );
//       } else {
//         createFolder(url + "/" + file.name);
//       }
//     });
//   });
// }

// function createFolder(url) {
//   fs.mkdir("./06-build-page/project-dist/" + url, { recursive: true }, (err) => {
//     if (err) throw err;
//     console.log("folder was copied");
//   });
//   copyFiles(url);
// }

// function writeStream(folder, outputFile) {
//   const output = fs.createWriteStream(outputFile);
//   fs.readdir(folder, { withFileTypes: true }, (err, files) => {
//     files.forEach((file) => {
//       url = folder + file.name;
//       const input = fs.createReadStream(url, "utf-8");
//       if (path.extname(file.name).slice(1) == "css") {
//         input.on("data", (chunk) => output.write(chunk));
//         input.on("error", (error) => console.log("Error", error.message));
//       }
//     });
//   });
// }

// const fs = require("fs");
// const path = require("path");

// const mainFolder = "./06-build-page/styles/";
// const outputFile = "./06-build-page/project-dist/styles.css";

// writeStream(mainFolder, outputFile);

// createFolder("06-build-page/assets");

// let document = "";
// const input = fs.createReadStream("./06-build-page/template.html", "utf-8");
// input.on("data", (chunk) => {
//   document += chunk;
// });
// input.on("error", (error) => console.log("Error", error.message));
// input.on("end", () => {
//   console.log("End", document.length);
// });





function callback(err) {
  if (err) throw err;
  console.log("file was copied");
}

function copyFiles(url) {
  fs.readdir("./06-build-page/" + url, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(
          "./06-build-page/" + url + "/" + file.name,
          "./06-build-page/project-dist/" + url + "/" + file.name,
          callback
        );
      } else {
        createFolder(url + "/" + file.name);
      }
    });
  });
}

function createFolder(url) {
  fs.mkdir("./06-build-page/project-dist/" + url, { recursive: true }, (err) => {
    if (err) throw err;
    console.log("folder was copied");
  });
  copyFiles(url);
}

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

async function combineHTML() {
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), "utf-8", callback);
  console.log(template);
  await fs.readdir("./06-build-page/components", { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      console.log(file);
      fs.readFile(path.join(__dirname, 'components', file.name), "utf-8", (err,text) => {
        template = template.replace(`{{${file.name.split('.')[0]}}}`, `${text}`);
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, callback);
      });

      // let htmlFile = fs.promises.readFile(path.join(__dirname, 'components', file.name), "utf-8", callback);
    });
  });
}


const fs = require("fs");
const path = require("path");

combineHTML();

fs.mkdir("./06-build-page/project-dist", { recursive: true }, (err) => {
  if (err) throw err;
  console.log("folder was copied");
});

createFolder("assets");

const mainFolder = "./06-build-page/styles/";
const outputFile = "./06-build-page/project-dist/styles.css";

writeStream(mainFolder, outputFile);


let document = "";
const input = fs.createReadStream("./06-build-page/template.html", "utf-8");
input.on("data", (chunk) => {
  document += chunk;
});
input.on("error", (error) => console.log("Error", error.message));
input.on("end", () => {
  console.log("End", document.length);
});