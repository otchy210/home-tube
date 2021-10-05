export interface ApiResult {
    ok: boolean;
    status: number;
    statusText: string;
    body?: JsonSerializable;
}

const handleApiResult = (result: Response, resolve: (value: ApiResult | PromiseLike<ApiResult>) => void) => {
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
};

const handleApiError = (error: any, resolve: (value: ApiResult | PromiseLike<ApiResult>) => void) => {
    resolve({
        ok: false,
        status: -1,
        statusText: error.toString(),
    });
};

export class Api {
    apiRoot: string;

    constructor(port: number = 80, version: number = 1) {
        const { protocol, hostname } = location;
        this.apiRoot = `${protocol}//${hostname}:${port}/v${version}`;
    }

    get(path: string): Promise<ApiResult> {
        const apiPath = `${this.apiRoot}${path}`;
        return new Promise<ApiResult>((resolve) => {
            fetch(apiPath)
                .then((result) => handleApiResult(result, resolve))
                .catch((error) => handleApiError(error, resolve));
        });
    }

    post(path: string, body: JsonSerializable): Promise<ApiResult> {
        const apiPath = `${this.apiRoot}${path}`;
        return new Promise<ApiResult>((resolve) => {
            fetch(apiPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((result) => handleApiResult(result, resolve))
                .catch((error) => handleApiError(error, resolve));
        });
    }

    ping(): Promise<ApiResult> {
        return this.get('/ping');
    }

    postSettings(settings: Settings): Promise<ApiResult> {
        return this.post('/settings', settings as JsonSerializable);
    }
}
