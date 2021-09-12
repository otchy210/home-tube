import { createContext } from 'react';

export interface SettingsContextProps {
    apiRoot?: string;
}

const SettingsContext = createContext<SettingsContextProps>({});

export default SettingsContext;
