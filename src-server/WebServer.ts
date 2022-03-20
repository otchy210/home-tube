import ApiServer from '@otchy/home-tube-api/dist/ApiServer';
import { DEFAULT_API_PORT, DEFAULT_APP_CONFIG_FILE } from '@otchy/home-tube-api/dist/const';
import { md5 } from '@otchy/home-tube-api/dist/utils/StringUtils';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { createServer, IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import { InitialParams } from './common';
import * as yargs from 'yargs';
import { gzip } from 'zlib';
import { resolve } from 'path';
import { ApiServerConfig } from '@otchy/home-tube-api/dist/types';

const DEFAULT_WEB_PORT = 8080;

const DEFAULT_API_HOST = `{ws-protocol}://{ws-hostname}:${DEFAULT_API_PORT}`;

type Argv = {
    port?: number;
    apiPort?: number;
    appConfig?: string;
    apiHost?: string;
};

const parseArgv = (): Argv => {
    const defaultAppConfig = join(homedir(), DEFAULT_APP_CONFIG_FILE);
    return yargs
        .option('port', {
            type: 'number',
            description: `Web server port [default: ${DEFAULT_WEB_PORT}]`,
        })
        .option('apiPort', {
            type: 'number',
            description: `API server port [default: ${DEFAULT_API_PORT}]`,
        })
        .option('appConfig', {
            type: 'string',
            description: `HomeTube config file path [default: ${defaultAppConfig}]`,
        })
        .option('apiHost', {
            type: 'string',
            description: `API server host, set if you run API server apart from this [default: ${DEFAULT_API_HOST}]`,
        })
        .help().argv as Argv;
};

const getInitialParams = (argv: Argv): InitialParams => {
    if (argv.apiHost) {
        return {
            apiHost: argv.apiHost,
        };
    }
    return {
        apiHost: DEFAULT_API_HOST,
    };
};

const getApiServerConfig = (argv: Argv): ApiServerConfig => {
    return {
        port: argv.apiPort ?? DEFAULT_API_PORT,
        appConfig: argv.appConfig,
    };
};

const readCurrentDirFileSync = (path: string): Buffer => {
    return readFileSync(resolve(__dirname, path));
};

export default class WebServer {
    private port: number;
    private httpServer: HttpServer;
    private initialParams: InitialParams;
    private apiServer: ApiServer | null;
    private mainJs: Buffer;
    private gzippedMainJs: Buffer;
    private mainJsPath: string;
    private indexHtml: string;
    private favicon: Buffer;

    public constructor() {
        const argv = parseArgv();

        this.port = argv.port ?? DEFAULT_WEB_PORT;
        this.initialParams = getInitialParams(argv);
        this.apiServer = !argv.apiHost ? new ApiServer(getApiServerConfig(argv)) : null;
        this.httpServer = createServer((request: IncomingMessage, response: ServerResponse): void => {
            this.handleRequest(request, response);
        });
        this.mainJs = readCurrentDirFileSync('main.js');
        const mainJsFile = `main.${md5(this.mainJs)}.js`;
        this.gzippedMainJs = Buffer.from('');
        gzip(this.mainJs, (_, gzipped) => {
            this.gzippedMainJs = gzipped;
        });
        this.mainJsPath = `/${mainJsFile}`;
        this.indexHtml = readCurrentDirFileSync('index.html').toString().replace('main.js', mainJsFile);
        this.favicon = readCurrentDirFileSync('favicon.png');
    }

    public showInitialMessages() {
        console.log('==== HomeTube ==================================================');
        console.log(`WebServer running on http://localhost:${this.port}`);
        if (this.apiServer) {
            const appConfigPath = this.apiServer.getAppConfigPath();
            console.log(`ApiServer running on ${this.initialParams.apiHost}`);
            console.log(`AppConfig: ${appConfigPath}`);
        }
        console.log('Press Ctrl+C to stop the server');
        console.log('================================================================');
    }

    public start(): Promise<WebServer> {
        return new Promise((resolve) => {
            (async () => {
                if (this.apiServer) {
                    await this.apiServer.start();
                }
                this.httpServer.listen(this.port, () => {
                    resolve(this);
                });
            })();
        });
    }

    private handleRequest(request: IncomingMessage, response: ServerResponse): void {
        const { url } = request;
        if (url === this.mainJsPath) {
            const acceptGzip = ((request.headers['accept-encoding'] as string) ?? '').split(/, ?/).includes('gzip');
            if (acceptGzip) {
                response.writeHead(200, {
                    'Content-Type': 'text/javascript; charset=UTF-8',
                    'Cache-Control': 'public, max-age=2592000000, immutable', // 1000 * 60 * 60 * 24 * 30 = 30 days
                    'Content-Encoding': 'gzip',
                });
                response.end(this.gzippedMainJs);
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/javascript; charset=UTF-8',
                    'Cache-Control': 'public, max-age=2592000000, immutable', // 1000 * 60 * 60 * 24 * 30 = 30 days
                });
                response.end(this.mainJs);
            }
            return;
        }
        if (url === '/main.js.LICENSE.txt') {
            const license = readCurrentDirFileSync('main.js.LICENSE.txt');
            response.writeHead(200, {
                'Content-Type': 'text/plain; charset=UTF-8',
            });
            response.end(license);
            return;
        }
        if (url === '/favicon.png') {
            response.writeHead(200, {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=60000, immutable', // 1000 * 60 = 1 min
            });
            response.end(this.favicon);
            return;
        }
        if (url === '/initialParams.json') {
            response.writeHead(200, {
                'Content-Type': 'application/json; charset=UTF-8',
            });
            response.end(JSON.stringify(this.initialParams));
            return;
        }
        if (url?.startsWith('/locales/')) {
            const translation = readCurrentDirFileSync(url.slice(1));
            response.writeHead(200, {
                'Content-Type': 'application/json; charset=UTF-8',
            });
            response.end(translation);
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        response.end(this.indexHtml);
    }

    public close(): WebServer {
        if (this.apiServer) {
            this.apiServer.close();
        }
        this.httpServer.close();
        return this;
    }
}
