const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
let data = [];
let ind = -1;

/* ----- Start: Собирает в единый файл стили из папки styles и помещает их в файл project-dist/style.css ----- */
const outfile = fs.createWriteStream(
  path.resolve(__dirname, "project-dist", "style.css")
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
                  console.log("Добавлены данные в styles.css из " + file.name);
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
/* ----- End: Собирает в единый файл стили из папки styles и помещает их в файл project-dist/style.css ----- */

/* ----- Start: Копирует папку assets в project-dist/assets ----- */
function copyDirectory(pathSource, pathDest) {
  fs.mkdir(pathDest, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Создан каталог: " + pathDest);
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

fs.stat(path.resolve(__dirname, "project-dist/assets"), function(err) {
  if (!err) {
    fs.rm(path.resolve(__dirname, "project-dist/assets"), { recursive: true }, (errdel) => {
      if (errdel) {
        console.error(errdel.message);        
      }
      copyDirectory(
        path.resolve(__dirname, "assets"),
        path.resolve(__dirname, "project-dist/assets")
      );
    });
  } 
  else  copyDirectory(
    path.resolve(__dirname, "assets"),
    path.resolve(__dirname, "project-dist/assets")
  );
})

/* ----- End: Копирует папку assets в project-dist/assets ----- */

/* ----- 
  Start: Заменяет шаблонные теги в файле template.html с названиями файлов из папки components (пример:{{section}})
        на содержимое одноимённых компонентов и сохраняет результат в project-dist/index.html.
 ----- */

function readComponent(dataTmpl) {
  let indStart = 0;
  let indEnd = 0;
  indStart = dataTmpl.indexOf("{{", 0);
  if (indStart === -1) {
    const outfileIndex = fs.createWriteStream(
      path.resolve(__dirname, "project-dist/index.html")
    );
    outfileIndex.write(dataTmpl);
    console.log("Скоректированные данные шаблона template.html сохранены в project-dist/index.html");
  }
  else {
    indEnd = dataTmpl.indexOf("}}", indStart);
    const stream = fs.ReadStream(path.resolve(__dirname, 'components', dataTmpl.slice(indStart + 2, indEnd)+".html"), "utf-8");
    let data = '';
    stream.on("data", (chunk) => (data += chunk));
    stream.on("end", () => {
      readComponent(dataTmpl.slice(0, indStart) + data + dataTmpl.slice(indEnd + 2));
    });
  }
}

function readTemplate(fileTmpl) {
  const stream = fs.ReadStream(fileTmpl, "utf-8");
  let data = '';
  stream.on("data", (chunk) => (data += chunk));
  stream.on("end", () => {
    readComponent(data);
  });
}

readTemplate(path.resolve(__dirname, "template.html"))

/* const outfileIndex = fs.createWriteStream(
  path.resolve(__dirname, "project-dist/index.html")
);
outfileIndex.write(readTemplate(path.resolve(__dirname, "template.html")));
 */
/* -----
 End: Заменяет шаблонные теги в файле template.html с названиями файлов из папки components (пример:{{section}})
       на содержимое одноимённых компонентов и сохраняет результат в project-dist/index.html.
----- */