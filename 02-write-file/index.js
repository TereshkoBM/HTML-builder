const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const path = require('path');
const fs = require('fs');
const outfile = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

rl.write('Введите текст для записи в файл (для завершения ввода нажмите сочетания клавиш ctrl + c или введите в новой строке exit )\n')

rl.on('line',  chunk => {
    if(chunk.toString().trim().toLowerCase() === 'exit') {
        rl.write('\nСработал exit: Ваш текст в файле  ' + path.resolve(__dirname, 'text.txt'));
        process.exit();}
    outfile.write(chunk+'\n');
  });
  rl.on('SIGINT', () => {
    rl.write('\nНажаты ctrl + c: Ваш текст в файле  ' + path.resolve(__dirname, 'text.txt'));
    process.exit();
  });
