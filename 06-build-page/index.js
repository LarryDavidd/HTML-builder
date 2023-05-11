function callback(err) {
  if (err) throw err;
  console.log("file was copied");
}

function copyFiles(url) {
  fs.readdir(path.join(__dirname, url), { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(
          path.join(__dirname, url, file.name),
          path.join(__dirname, 'project-dist', url, file.name),
          callback
        );
      } else {
        createFolder(path.join(url, file.name));
      }
    });
  });
}

function createFolder(url) {
  fs.mkdir(path.join(__dirname, 'project-dist', url), { recursive: true }, (err) => {
    if (err) throw err;
    console.log("folder was copied");
  });
  copyFiles(url);
}

function writeStream() {
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'styles.css'));
  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      url = path.join(__dirname, 'styles', file.name);
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
  await fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
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

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
  console.log("folder was copied");
});

createFolder("assets");


writeStream();


let document = "";
const input = fs.createReadStream(path.join(__dirname, 'template.html'), "utf-8");
input.on("data", (chunk) => {
  document += chunk;
});
input.on("error", (error) => console.log("Error", error.message));
input.on("end", () => {
  console.log("End", document.length);
});