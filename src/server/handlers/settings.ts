import { GetHandler } from "./Handler";
import fs from 'fs/promises';
import { getSettingsFilePath } from "../common/pathUtil";

const DEFAULT_SETTINGS = {
    apiPort: 8210,
    targetFolders: [],
} as Settings;

export const readSettings = async (): Promise<Settings> => {
    const settingsFilePath = await getSettingsFilePath();
    const savedSettingsStr = await fs.readFile(settingsFilePath).catch(() => {});
    const savedSettings = savedSettingsStr ? JSON.parse(savedSettingsStr.toString()) : {} as Settings;
    const settings = {...DEFAULT_SETTINGS, ...savedSettings};
    return settings;
};

export const getSettings: GetHandler = {
    getPath: () => '/settings',
    handle: async () => {
        return readSettings() as Promise<JsonSerializable>;
    }
};
