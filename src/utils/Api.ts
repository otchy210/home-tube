import { AllTags, AppConfig, Json, VideoDetails, VideoDocument, VideoProperties } from '@otchy/home-tube-api/dist/types';
import { createSearchParams } from 'react-router-dom';

type Method = 'GET' | 'POST';

type FetchOptions = {
    method: Method;
    headers?: { [name: string]: string };
    body?: string;
};

type Params = Record<string, string | string[]>;

export class Api {
    private apiHost;
    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }
    private getApiUrl(apiPath: string, params?: Params): string {
        if (!params || Object.keys(params).length === 0) {
            return `${this.apiHost}${apiPath}`;
        }
        const searchParams = createSearchParams(params);
        return `${this.apiHost}${apiPath}?${searchParams}`;
    }
    private call<T>(method: Method, apiPath: string, options: { body?: Json; params?: Params } = {}): Promise<T> {
        const { body, params } = options;
        const apiUrl = this.getApiUrl(apiPath, params);
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
    private get<T>(apiPath: string, params?: Record<string, string | string[]>): Promise<T> {
        return this.call('GET', apiPath, { params });
    }
    private post<T>(apiPath: string, body: Json, params?: Record<string, string | string[]>): Promise<T> {
        return this.call('POST', apiPath, { body, params });
    }
    getAppConfig(): Promise<AppConfig> {
        return this.get<AppConfig>('/appConfig');
    }
    postAppConfig(appConfig: AppConfig): Promise<AppConfig> {
        return this.post<AppConfig>('/appConfig', appConfig);
    }
    search(params?: Record<string, string | string[]>): Promise<Set<VideoDocument>> {
        return this.get<Set<VideoDocument>>('/search', params);
    }
    getDetails(id: string): Promise<VideoDetails> {
        return this.get<VideoDetails>('/details', { id });
    }
    getThumbnailsUrl(id: string, minute: string): string {
        return this.getApiUrl('/thumbnails', { id, minute });
    }
    getSnapshotUrl(id: string): string {
        return this.getApiUrl('/snapshot', { id });
    }
    getVideoUrl(id: string): string {
        return this.getApiUrl('/video', { id });
    }
    postProperties(id: string, properties: VideoProperties): Promise<VideoProperties> {
        return this.post<VideoProperties>('/properties', properties, { id });
    }
    getAllTags(): Promise<AllTags> {
        return this.get<AllTags>('/allTags');
    }
}
