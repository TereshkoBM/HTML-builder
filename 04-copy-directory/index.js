const fs = require("fs");
const path = require("path");

function copyDirectory(pathSource, pathDest) {  
  fs.mkdir(pathDest, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    fs.readdir(pathSource, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.resolve(pathSource, file.name),
              path.resolve(pathDest, file.name),
              (err) => {
                if (err) {
                  console.log("Error Found:", err);
                }
                console.log("скопирован: " + file.name);
              }
            );
          } else {
            if (file.isDirectory()) {
              copyDirectory(
                path.resolve(pathSource, file.name),
                path.resolve(pathDest, file.name)
              );
            }
          }
        });
      }
    });
  });
}

fs.stat(path.resolve(__dirname, "files-copy"), function(err) {
  if (!err) {
    fs.rm(path.resolve(__dirname, "files-copy"), { recursive: true }, (errdel) => {
      if (errdel) {
        console.error(errdel.message);        
      }
      copyDirectory(
        path.resolve(__dirname, "files"),
        path.resolve(__dirname, "files-copy")
      );
    });
  } 
  else  copyDirectory(
    path.resolve(__dirname, "files"),
    path.resolve(__dirname, "files-copy")
  );
})




