import path from 'path';
import fs from 'fs/promises';

const HOME_DIR_NAME = '.hometube';
const SETTINGS_FILE_NAME = 'settings.json';

export const getHomeDir = async (): Promise<string> => {
    const name = process.platform == 'win32' ? 'USERPROFILE' : 'HOME';
    const homeDir = process.env[name];
    if (!homeDir) {
        throw new Error(`Not found home directory.`);
    }
    const homeTubeHome = path.join(homeDir, HOME_DIR_NAME);
    return new Promise(async (resolve) => {
        const stat = await fs.stat(homeTubeHome).catch((err) => {
            console.log('No HomeTube home directory found. Creating.');
        });
        if (stat && stat.isDirectory()) {
            resolve(homeTubeHome);
            return;
        }
        await fs.mkdir(homeTubeHome);
        resolve(homeTubeHome);
    });
}

export const getSettingsFilePath = async (): Promise<string> => {
    const homeDir = await getHomeDir();
    return path.join(homeDir, SETTINGS_FILE_NAME);
}