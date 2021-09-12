import fs from 'fs/promises';

console.log('======== HomeTube API Server ========');

const apiPort = 9999;

const settings = {
    apiPort
};

(async () => {
    await fs.writeFile('./public/settings.json', JSON.stringify(settings));
    console.log('DONE!');
})();
