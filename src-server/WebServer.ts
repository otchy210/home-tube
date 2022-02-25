import ApiServer from '@otchy/home-tube-api/dist/ApiServer';
import { DEFAULT_API_PORT, DEFAULT_APP_CONFIG_FILE } from '@otchy/home-tube-api/dist/const';
import { md5 } from '@otchy/home-tube-api/dist/utils/StringUtils';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { createServer, IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import { InitialParams } from './common';
import * as yargs from 'yargs';
import { ServerConfig } from '@otchy/home-tube-api/dist/types';
import { resolve } from 'path';

const DEFAULT_WEB_PORT = 8080;

type Argv = {
    port?: number;
    apiPort?: number;
    appConfig?: string;
    apiHost?: string;
};

const parseArgv = (): Argv => {
    const defaultApiHost = `http://localhost:${DEFAULT_API_PORT}`;
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
            description: `API server host, set if you run API server apart from this [default: ${defaultApiHost}]`,
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
        apiHost: `http://localhost:${argv.apiPort ?? DEFAULT_API_PORT}`,
    };
};

const getServerConfig = (argv: Argv): ServerConfig => {
    return {
        port: argv.apiPort ?? DEFAULT_API_PORT,
        appConfigPath: argv.appConfig,
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
    private mainJs: string;
    private mainJsPath: string;
    private indexHtml: string;
    private favicon: Buffer;

    public constructor() {
        const argv = parseArgv();

        this.port = argv.port ?? 80;
        this.initialParams = getInitialParams(argv);
        this.apiServer = !argv.apiHost ? new ApiServer(getServerConfig(argv)) : null;
        this.httpServer = createServer((request: IncomingMessage, response: ServerResponse): void => {
            this.handleRequest(request, response);
        });
        this.mainJs = readCurrentDirFileSync('main.js').toString();
        const mainJsFile = `main.${md5(this.mainJs)}.js`;
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
            response.writeHead(200, {
                'Content-Type': 'text/javascript; charset=UTF-8',
                'Cache-Control': 'public, max-age=2592000000, immutable', // 1000 * 60 * 60 * 24 * 30 = 30 days
            });
            response.end(this.mainJs);
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
