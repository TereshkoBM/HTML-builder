const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
let data = [];
let ind = -1;

const outfile = fs.createWriteStream(
  path.resolve(__dirname, "project-dist", "bundle.css")
);

fs.mkdir(
  path.resolve(__dirname, "project-dist"),
  { recursive: true },
  (err) => {
    if (err) {
      return console.error(err);
    }
    fs.readdir(
      path.resolve(__dirname, "styles"),
      { withFileTypes: true },
      (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach((file) => {
            if (file.isFile()) {
              if (file.name.slice(file.name.indexOf(".")) === ".css") {
                const stream = fs.ReadStream(
                  path.resolve(__dirname, "styles", file.name),
                  "utf-8"
                );
                ind++;
                data[ind] = "";
                stream.on("data", (chunk) => (data[ind] += chunk));
                stream.on("end", () => {
                  console.log("Добавлены данные в bundle.css из " + file.name);
                  outfile.write(data[ind]);
                });
              }
            }
          });
        }
      }
    );
  }
);
