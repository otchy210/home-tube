import { AppConfig } from '@otchy/home-tube-api/dist/types';
import { getAppConfigDeepCopy } from './ObjectUtils';

describe('getAppConfigDeepCopy', () => {
    it('copies appConfig deeply', () => {
        const src: AppConfig = {
            storages: [
                {
                    path: 'a',
                    enabled: true,
                },
                {
                    path: 'b',
                    enabled: false,
                },
            ],
            ffmpeg: 'c',
        };
        const copy = getAppConfigDeepCopy(src);
        expect(copy).toStrictEqual(src);
    });
});
