const fs = require ('fs');
const path = require ('path');
const { stdin, stdout } = require('process');
const outputFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Привет , напиши свой текст ниже , если захочешь завершить напиши "exit либо зажми ctrl + c" \n');
stdin.on('data', (data) =>{
  if (data.toString().trim() === 'exit') {
    console.log("Спасибо за выполненную работу, твой текст записано в файле 'text.txt' , удачи!");
    process.exit();
}
  outputFile.write(data);
})
process.on('SIGINT', () => {
  console.log("Удачи!");
  process.exit();
});
