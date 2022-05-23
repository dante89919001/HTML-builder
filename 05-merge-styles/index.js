const fs = require('fs'), path = require('path'), outputDir = 'project-dist',outputFile = 'bundle.css';

const outputPath = path.resolve(__dirname, outputDir, outputFile), stylesDir = 'styles', stylesPath = path.resolve(__dirname, stylesDir);

async function getFile(file) {
  let stream = fs.createReadStream(file);
  stream.setEncoding('utf8');
  let data = '';
  for await (const chunk of stream) {
    data += chunk;
  }
  return data;
}
async function create() {
  const files = await fs.promises.readdir(stylesPath);
  let data = '';

  for (const file of files) {
    if (path.extname(file) !== '.css') continue;
    data += (await getFile(path.resolve(stylesPath, file))) + '\n';
  }

  const outputStream = fs.createWriteStream(outputPath);
  outputStream.write(data);
  outputStream.end();
}

create();
