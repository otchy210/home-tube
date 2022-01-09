import { AppConfig } from '@otchy/home-tube-api/dist/types';

export class Api {
    private apiHost;
    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }
    get<T>(apiPath: string): Promise<T> {
        const apiUrl = `${this.apiHost}${apiPath}`;
        return new Promise((resolve, reject) => {
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        const reason = `Api "${apiPath}" doesn't return 200.`;
                        console.error(reason, response);
                        reject(reason);
                    } else {
                        resolve(response.json());
                    }
                })
                .catch((e) => {
                    const reason = `Api "${apiPath}" failed.`;
                    console.error(reason, e);
                    reject(reason);
                });
        });
    }
    getAppConfig(): Promise<AppConfig> {
        return this.get<AppConfig>('/appConfig');
    }
}
