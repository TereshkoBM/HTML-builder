const { stdin, stdout, stderr } = process;
const path = require('path');
const fs = require('fs');

const output = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write('Введите текст для записи в файл (для завершения ввода нажмите сочетания клавиш ctrl + c или введите в новой строке exit )\n')
stdin.on('data', chunk => {
   if(chunk.toString().trim().toLowerCase() === 'exit') process.exit();
   output.write(chunk);
});

process.on('exit', code => {
    if (code === 0) {
        stdout.write('\nВаш текст в файле  ' + path.resolve(__dirname, 'text.txt'));
    } else {        
        stderr.write(` Программа завершилась с кодом ${code}`);
    }
});