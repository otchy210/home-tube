import { AppConfig, Json } from '@otchy/home-tube-api/dist/types';

type Method = 'GET' | 'POST';

type FetchOptions = {
    method: Method;
    headers?: { [name: string]: string };
    body?: string;
};

export class Api {
    private apiHost;
    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }
    private call<T>(method: Method, apiPath: string, body?: Json): Promise<T> {
        const apiUrl = `${this.apiHost}${apiPath}`;
        const fetchOptions: FetchOptions = { method };
        if (body) {
            fetchOptions.headers = {
                'Content-Type': 'application/json',
            };
            fetchOptions.body = JSON.stringify(body);
        }
        return new Promise((resolve, reject) => {
            fetch(apiUrl, fetchOptions)
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
    private get<T>(apiPath: string): Promise<T> {
        return this.call('GET', apiPath);
    }
    private post<T>(apiPath: string, body: Json): Promise<T> {
        return this.call('POST', apiPath, body);
    }
    getAppConfig(): Promise<AppConfig> {
        return this.get<AppConfig>('/appConfig');
    }
    postAppConfig(appConfig: AppConfig): Promise<AppConfig> {
        return this.post<AppConfig>('/appConfig', appConfig);
    }
}
