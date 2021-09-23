import { useContext } from "react";
import SettingsContext, { SettingsContextHolder } from "./SettingsContext";

export const useSettings = (): Settings | undefined => {
    const { value } = useContext<SettingsContextHolder>(SettingsContext);
    return value;
};

export const updateSettings = (settings: Settings): void => {
    const { update } = useContext<SettingsContextHolder>(SettingsContext);
    update?.(settings);
};
