const path = require('path');
const fs = require('fs');

const str = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding:'utf-8'});

str.on('data', (data) => console.log(data));
str.on('error', (err) => console.error(`err: ${err}`));
