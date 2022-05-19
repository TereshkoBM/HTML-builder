const fs = require("fs");
const path = require("path");

fs.mkdir(path.resolve(__dirname, "files-copy"), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Копирую файлы из папки files в папку files-copy");
  fs.readdir(
    path.resolve(__dirname, "files"),
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.resolve(__dirname, "files", file.name),
              path.resolve(__dirname, "files-copy", file.name),
              (err) => {
                if (err) {
                  console.log("Error Found:", err);
                }
                console.log('скопирован: ' + file.name)
              }
            );
          }
        });
      }
    }
  );
});
