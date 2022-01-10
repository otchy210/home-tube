import { AppConfig } from '@otchy/home-tube-api/dist/types';

export const getAppConfigDeepCopy = (src: AppConfig): AppConfig => {
    return {
        ...src,
        storages: [
            ...src.storages.map((storage) => {
                return { ...storage };
            }),
        ],
    };
};
