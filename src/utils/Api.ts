import {
    AllTags,
    AppConfig,
    AppConfigValidationError,
    Json,
    ServerStatus,
    VideoConverterStatus,
    VideoDetails,
    VideoDocument,
    VideoProperties,
    VideoValues,
} from '@otchy/home-tube-api/dist/types';
import { createSearchParams } from 'react-router-dom';
import TimeSizeLimitedCache from './TimeSizeLimitedCache';

type Method = 'GET' | 'POST' | 'DELETE';

type FetchOptions = {
    method: Method;
    headers?: { [name: string]: string };
    body?: string;
};

type Params = Record<string, string | string[]>;

type ApiSafeParams = Record<string, string>;

export class Api {
    private apiHost;
    private detailsCache;
    constructor(apiHost: string) {
        this.apiHost = apiHost;
        this.detailsCache = new TimeSizeLimitedCache<string, VideoDetails>(1000 * 60 * 10, 128);
    }
    private getApiUrl(apiPath: string, params?: Params): string {
        if (!params) {
            return `${this.apiHost}${apiPath}`;
        }
        const apiSafeParams = Object.entries(params).reduce((map, [name, value]) => {
            if (!value) {
                return map;
            }
            if (Array.isArray(value)) {
                const filteredValue = value.filter((item) => {
                    return item.trim().length > 0;
                });
                if (filteredValue.length > 0) {
                    map[name] = JSON.stringify(filteredValue);
                }
            } else {
                map[name] = value;
            }
            return map;
        }, {} as ApiSafeParams);
        if (Object.keys(apiSafeParams).length === 0) {
            return `${this.apiHost}${apiPath}`;
        }
        const searchParams = createSearchParams(apiSafeParams);
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
    private delete<T>(apiPath: string, params?: Record<string, string | string[]>): Promise<T> {
        return this.call('DELETE', apiPath, { params });
    }
    getAppConfig(): Promise<AppConfig> {
        return this.get<AppConfig>('/appConfig');
    }
    postAppConfig(appConfig: AppConfig): Promise<AppConfig | AppConfigValidationError[]> {
        return this.post<AppConfig>('/appConfig', appConfig);
    }
    getServerStatus(): Promise<ServerStatus> {
        return this.get('/serverStatus');
    }
    search(params?: Record<string, string | string[]>): Promise<Set<VideoDocument>> {
        return this.get<Set<VideoDocument>>('/search', params);
    }
    getDetails(key: string): Promise<VideoDetails> {
        const cachedDetails = this.detailsCache.get(key);
        if (cachedDetails) {
            return Promise.resolve(cachedDetails);
        }
        return new Promise((resolve, reject) => {
            this.get<VideoDetails>('/details', { key })
                .then((videoDetails) => {
                    this.detailsCache.add(key, videoDetails);
                    resolve(videoDetails);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }
    getThumbnailsUrl(key: string, minute: string): string {
        return this.getApiUrl('/thumbnails', { key, minute });
    }
    getSnapshotUrl(key: string): string {
        return this.getApiUrl('/snapshot', { key });
    }
    postSnapshot(key: string, dataURL: string): Promise<void> {
        return this.post<void>('/snapshot', { dataURL }, { key });
    }
    getVideoUrl(key: string): string {
        return this.getApiUrl('/video', { key });
    }
    postProperties(key: string, properties: VideoProperties): Promise<VideoProperties> {
        this.detailsCache.remove(key);
        return this.post<VideoProperties>('/properties', properties, { key });
    }
    postConvert(key: string, type: string): Promise<{ status: VideoConverterStatus }> {
        this.detailsCache.remove(key);
        return this.post<{ status: VideoConverterStatus }>('/convert', null, { key, type });
    }
    deleteConvert(key: string, type: string): Promise<{ status: VideoConverterStatus }> {
        this.detailsCache.remove(key);
        return this.delete<{ status: VideoConverterStatus }>('/convert', { key, type });
    }
    getAllTags(): Promise<AllTags> {
        return this.get<AllTags>('/allTags');
    }
    postRename(key: string, name: string): Promise<VideoValues> {
        return this.post<VideoValues>('/rename', {}, { key, name });
    }
}
