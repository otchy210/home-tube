import React, { useEffect, useMemo } from 'react';
import { createContext, useContext } from 'react';

export type Shortcut = {
    keyCode: number;
    metaKey?: boolean;
    ctrlKey?: boolean;
    altKey?: boolean;
    enableInput?: boolean;
    fn: (e: KeyboardEvent) => void;
};

const getShortcutKey = ({ keyCode, metaKey, ctrlKey, altKey }: Shortcut) => {
    return `${keyCode}-${metaKey ?? false}-${ctrlKey ?? false}-${altKey ?? false}`;
};

const getEventKey = ({ keyCode, metaKey, ctrlKey, altKey }: KeyboardEvent) => {
    return `${keyCode}-${metaKey ?? false}-${ctrlKey ?? false}-${altKey ?? false}`;
};

type ShortcutContextValue = {
    registerShortcut: (shortcut: Shortcut) => void;
    unregisterShortcut: (shortcut: Shortcut) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ShortcutContext = createContext<ShortcutContextValue>({ registerShortcut: () => {}, unregisterShortcut: () => {} });

export const useShortcut = (): ShortcutContextValue => {
    return useContext(ShortcutContext);
};

export const ShortcutProvider: React.FC = ({ children }) => {
    const keyMap = useMemo(() => {
        return new Map<string, Shortcut>();
    }, []);
    const registerShortcut = (shortcut: Shortcut) => {
        const key = getShortcutKey(shortcut);
        if (keyMap.has(key)) {
            throw new Error(`Duplicate shortcut: ${key}`);
        }
        keyMap.set(key, shortcut);
    };
    const unregisterShortcut = (shortcut: Shortcut) => {
        const key = getShortcutKey(shortcut);
        if (!keyMap.has(key)) {
            console.warn(`No shortcut found: ${key}`);
            return;
        }
        keyMap.delete(key);
    };
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const key = getEventKey(e);
            if (!keyMap.has(key)) {
                return;
            }
            const shortcut = keyMap.get(key)!;
            const target = e.target as Element | null;
            if (!shortcut.enableInput && target && target.tagName === 'INPUT') {
                return;
            }
            e.preventDefault();
            shortcut.fn(e);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    });
    const context: ShortcutContextValue = {
        registerShortcut,
        unregisterShortcut,
    };
    return <ShortcutContext.Provider value={context}>{children}</ShortcutContext.Provider>;
};
