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



// const fs = require('fs');
// const path = require('path');

// const dirCopy = path.join(__dirname, 'files');
// const dirPaste = path.join(__dirname, 'files-copy');

// function copyFiles() {
//   fs.readdir(dirCopy, (err, files) => {
//     if (err) throw err;
//     for (let i = 0; i < files.length; i++) {
//       const fileDir = path.join(dirCopy, files[i]);
//       const copyDir = path.join(dirPaste, files[i]);
//       fs.stat(fileDir, function(err, stats) {
//         if (stats.isFile()) {
//           //копирывание файлов
//           fs.copyFile(fileDir, copyDir, err => {
//             if(err) throw err;
//           });

//         } else {
//           //создание папок, если они есть
//           // let folderDir = path.join(dirPaste, files[i]);
//           // fs.mkdir(folderDir, err => {
//           //   if (err) throw err;
//           // });
//           // добавить рекрусию для копирывания файлов в папках
//           // copyFiles() 
//         }
//       });
//     }
//     console.log('Файлы успешно скопированы');
//   });
// }

// function deleteFiles() {
//   fs.readdir(dirPaste, (err, files) => {
//     if (err) throw err;
//     for (let i = 0; i < files.length; i++) {
//       const deleteFile = path.join(dirPaste, files[i]);

//       fs.stat(deleteFile, function(err, stats) {
//         if (stats.isFile()) {
//           // удаление файлов
//           fs.unlink(deleteFile, (err) => {
//             if (err) throw err;
//           });

//         } else {
//           // удаление папок
//           fs.rm(deleteFile, { recursive:true }, (err) => {
//             if (err) throw err;
//           });
//         }
//       });
//     }
//   });
// }

// fs.mkdir(dirPaste, { recursive: true }, err => {
//   if (err) throw err;
//   deleteFiles();
//   copyFiles();
// });