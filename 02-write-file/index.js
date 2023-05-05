const fs = require("fs");
const { stdout, stdin, exit } = process;

const output = fs.createWriteStream("text.txt", "utf-8");

stdout.write("Здравствуйте! \n");
stdout.write("Введите, пожалуйста, любой текст \n");
stdin.on("data", (data) => {
  const dataString = data.toString();
  if (dataString.includes("exit")) {
    exit();
  } else {
    output.write(dataString);
  }
});

process.on("exit", () => stdout.write("Удачи!"));