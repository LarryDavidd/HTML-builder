const fs = require("fs");
const { stdout } = process;

const stream = fs.createReadStream("text.txt", "utf-8");
stream.on("data", (chunk) => stdout.write(chunk));
