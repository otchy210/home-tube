import ApiServer from '@otchy/home-tube-api/dist/ApiServer';
import { ServerConfig } from '@otchy/home-tube-api/dist/types';
import { md5 } from '@otchy/home-tube-api/dist/utils/StringUtils';
import { readFileSync } from 'fs';
import { createServer, IncomingMessage, Server as HttpServer, ServerResponse } from 'http';

export default class WebServer {
    private port: number;
    private httpServer: HttpServer;
    private apiServer: ApiServer | null;
    private mainJs: string;
    private mainJsPath: string;
    private indexHtml: string;
    private favicon: Buffer;

    public constructor(port: number, apiServerConfig?: ServerConfig) {
        this.port = port;
        this.apiServer = apiServerConfig ? new ApiServer(apiServerConfig) : null;
        this.httpServer = createServer((request: IncomingMessage, response: ServerResponse): void => {
            this.handleRequest(request, response);
        });
        this.mainJs = readFileSync('dist/main.js').toString();
        const mainJsFile = `main.${md5(this.mainJs)}.js`;
        this.mainJsPath = `/${mainJsFile}`;
        this.indexHtml = readFileSync('dist/index.html').toString().replace('main.js', mainJsFile);
        this.favicon = readFileSync('dist/favicon.png');
    }

    public getApiServer(): ApiServer | null {
        return this.apiServer;
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
            response.write(this.mainJs);
            response.end();
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
            response.writeHead(404);
            response.end();
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        response.write(this.indexHtml);
        response.end();
    }

    public close(): WebServer {
        if (this.apiServer) {
            this.apiServer.close();
        }
        this.httpServer.close();
        return this;
    }
}
