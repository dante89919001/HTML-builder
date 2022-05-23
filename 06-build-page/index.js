const fs = require('fs'), fsProm = require('fs/promises'), path = require('path');

const pathToCss = path.join(__dirname, 'styles'), pathToHtml = path.join(__dirname, 'template.html'), pathToAssets = path.join(__dirname, 'assets'), pathToComponents = path.join(__dirname, 'components'), pathToBuild = path.join(__dirname, 'project-dist'), pathToCssBundle = path.join(pathToBuild, 'style.css'), pathToAssetsBundle = path.join(pathToBuild, 'assets'), pathToHtmlBundle = path.join(pathToBuild, 'index.html');

async function clean(pathBundle) {
  await fsProm.rm(pathBundle, { recursive: true, force: true });
  await fsProm.mkdir(pathBundle, { recursive: true });
}
async function createHtml() {
  const allFiles = await fsProm.readdir(pathToComponents);
  const files = allFiles.filter(file => path.extname(file) === '.html');
  const readable = fs.createReadStream(pathToHtml, 'utf8');
  readable.on('data', async (htmlTemplate) => {
    let html = htmlTemplate.toString();
    for (const componentName of files) {
      const componentPath = path.join(pathToComponents, componentName), component = await fsProm.readFile(componentPath);name = path.basename(componentName, '.html'), html = html.replace(`{{${name}}}`, component);
    }
    await fsProm.writeFile(pathToHtmlBundle, html, 'utf8');
  });
}

async function createCss() {
  const allFiles = await fsProm.readdir(pathToCss) , cssFiles = allFiles.filter(file => path.extname(file) === '.css') , stream = fs.createWriteStream(pathToCssBundle, 'utf8');
  StreamEnd(cssFiles, stream);
}

function StreamEnd(files = [], fileWriteStream) {
  if (!files.length) {
    return fileWriteStream.end();
  }

  const currentFile = path.resolve(pathToCss, files.pop()) , currentReadStream = fs.createReadStream(currentFile, 'utf8');

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', function () {
    fileWriteStream.write('\n\n');
    StreamEnd(files, fileWriteStream);
  });

  currentReadStream.on('error', function (error) {
    console.error(error);
    fileWriteStream.close();
  });
}

async function copy(pathBundle, pathSource) {
  await fsProm.mkdir(pathBundle, { recursive: true });
  const files = await fsProm.readdir(pathSource);

  files.forEach(async (file) => {
    const baseFile = path.join(pathSource, file) ,newFile = path.join(pathBundle, file) , stat = await fsProm.stat(baseFile);
    if (stat.isDirectory()) {
      copy(newFile, baseFile);
    } else {
      await fsProm.copyFile(baseFile, newFile);
    }
  });
}

async function build() {
  await clean(pathToBuild);
  createHtml();
  createCss();
  copy(pathToAssetsBundle, pathToAssets);
}

build();
