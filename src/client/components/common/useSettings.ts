import { useContext } from "react";
import SettingsContext from "./SettingsContext";

export const useSettings = (): Settings => {
    const settings = useContext<Settings>(SettingsContext);
    return settings;
};
