const fs = require('fs') , path = require('path');
  
fs.readdir(`${__dirname}/secret-folder`, 
  { withFileTypes: true },
  (err, files) => {
  console.log("\n Все файлы директории:");
  if (err) console.log(err);
  else {
    files.forEach(file => {
        fs.stat(`${__dirname}/secret-folder/${file.name}`, (err, stats) => {
            if (err) throw err;
            if (file.isFile() === true)console.log(`${path.parse(file.name).name} - ${path.extname(file.name).replace(/./, '')} - ${stats.size / 1024}kb`); 
        });
    })
  }
});
