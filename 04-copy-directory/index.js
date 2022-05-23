
const fs = require('fs'), { readdir, mkdir, rm } = require('fs/promises'),  path = require('path'), Folder = path.join(__dirname, 'files'), newFolder = path.join(__dirname, 'files-copy');


const copyDir = async (folder, newFolder) => {
  await rm(newFolder, { recursive: true, force: true });
  fs.access(newFolder, err => {
    if(err){
      mkdir(newFolder, { recursive: true })
    } 
  })
  await readdir(folder).then(files => files.forEach(file => {
    fs.copyFile(`${folder}/${file}`, `${newFolder}/${file}`,(err) => {
        if (err) {
          console.log("Error Found:", err);
        }
      });
  }))
};

copyDir(Folder, newFolder);
