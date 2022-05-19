const path = require("path");
const fs = require("fs");
let sizeFile;

fs.readdir(
  path.resolve(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      console.log('Вывод информации о файлаx хранящихся в папке secret-folder :');
      files.forEach((file) => {
        if (file.isFile()) {
          fs.stat(
            path.resolve(__dirname, "secret-folder", file.name),
            (err, stats) => {
              if (err) throw err;
              sizeFile = stats.size;
              let ind = file.name.lastIndexOf('.');
              console.log(`${file.name.slice(0, ind)} - ${file.name.slice(ind+1)} - ${sizeFile}b`);
            }
          );          
        }
      });
    }
  }
);
