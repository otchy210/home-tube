import { DeleteHandler, GetHandler, PostHandler } from "./Handler";
import fs from 'fs/promises';
import { getSettingsFilePath } from "../common/pathUtil";

const DEFAULT_SETTINGS = {
    apiPort: 8210,
    targetFolders: [],
} as Settings;

const getPath = () => '/settings';

export const readSettings = async (): Promise<Settings> => {
    const settingsFilePath = await getSettingsFilePath();
    const savedSettingsStr = await fs.readFile(settingsFilePath).catch(() => {});
    const savedSettings = savedSettingsStr ? JSON.parse(savedSettingsStr.toString()) : {} as Settings;
    const settings = {...DEFAULT_SETTINGS, ...savedSettings};
    return settings;
};

const writeSettings = async (settings: Settings): Promise<void> => {
    const settingsFilePath = await getSettingsFilePath();
    await fs.writeFile(settingsFilePath, JSON.stringify(settings));
};

export const getSettings: GetHandler = {
    getPath: getPath,
    handle: async () => {
        return readSettings() as Promise<JsonSerializable>;
    }
};

export const postSettings: PostHandler = {
    getPath: getPath,
    handle: async (req) => {
        const settings = req?.body ?? {} as Settings;
        writeSettings(settings);
        return true;
    }
};

export const deleteSettings: DeleteHandler = {
    getPath: getPath,
    handle: async () => {
        const settingsFilePath = await getSettingsFilePath();
        await fs.rm(settingsFilePath);
        return true;
    }
}