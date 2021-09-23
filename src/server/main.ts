import fs from 'fs/promises';
import { start } from './apiServer';
import { readSettings } from './handlers/settings';

(async () => {
    const settings = await readSettings();
    if (!settings.apiPort) {
        throw new Error(`No apiPort set in settings: ${JSON.stringify(settings)}`);
    }
    await fs.writeFile('./public/settings.json', JSON.stringify(settings));
    start(settings.apiPort);
})();
