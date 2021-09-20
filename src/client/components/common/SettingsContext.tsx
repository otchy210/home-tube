import { createContext } from 'react';

export type SettingsContextHolder = {
    value?: Settings;
    update?: (settings: Settings) => void;
};

const SettingsContext = createContext<SettingsContextHolder>({});

export default SettingsContext;
