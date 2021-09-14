import fs from 'fs/promises';
import { start } from './apiServer';

const apiPort = 9999;

const settings = {
    apiPort
};

(async () => {
    await fs.writeFile('./public/settings.json', JSON.stringify(settings));
    start(apiPort);
})();
