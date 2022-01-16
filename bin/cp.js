const fs = require('fs');

fs.copyFileSync('src/index.html', 'dist/index.html');
fs.copyFileSync('src/images/favicon.png', 'dist/favicon.png');
