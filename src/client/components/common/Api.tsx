export type JsonSerializable =
    | null
    | boolean
    | number
    | string
    | [JsonSerializable]
    | { [key: string]: JsonSerializable };

export interface ApiResult {
    ok: boolean;
    status: number;
    statusText: string;
    body?: JsonSerializable;
}

export class Api {
    apiRoot: string;

    constructor(port: number = 80, version: number = 1) {
        const { protocol, hostname } = location;
        this.apiRoot = `${protocol}//${hostname}:${port}/v${version}`;
    }

    get(path: string): Promise<ApiResult> {
        const apiPath = `${this.apiRoot}/${path}`;
        return new Promise<ApiResult>((resolve) => {
            fetch(apiPath)
                .then((result) => {
                    const apiResult = {
                        ok: result.ok,
                        status: result.status,
                        statusText: result.statusText,
                    } as ApiResult;
                    if (!result.ok) {
                        resolve(apiResult);
                        return;
                    }
                    result.json().then((json) => {
                        apiResult.body = json;
                        resolve(apiResult);
                    });
                })
                .catch((error) => {
                    console.log(error);
                    resolve({
                        ok: false,
                        status: -1,
                        statusText: error.toString(),
                    });
                });
        });
    }

    ping(): Promise<ApiResult> {
        return this.get('/ping');
    }
}
