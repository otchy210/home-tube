import ApiServer from '@otchy/home-tube-api/dist/ApiServer';
import { ServerConfig } from '@otchy/home-tube-api/dist/types';
import { createServer, IncomingMessage, Server as HttpServer, ServerResponse } from 'http';

const handleRequest = (request: IncomingMessage, response: ServerResponse): void => {};

export default class WebServer {
    private port: number;
    private httpServer: HttpServer;
    private apiServer: ApiServer | null;

    public constructor(port: number, apiServerConfig?: ServerConfig) {
        this.port = port;
        this.apiServer = apiServerConfig ? new ApiServer(apiServerConfig) : null;
        this.httpServer = createServer((request: IncomingMessage, response: ServerResponse): void => {
            handleRequest(request, response);
        });
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

    public close(): WebServer {
        if (this.apiServer) {
            this.apiServer.close();
        }
        this.httpServer.close();
        return this;
    }
}
