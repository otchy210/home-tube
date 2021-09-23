import express from 'express';

export interface GetHandler {
    getPath: () => string;
    handle: (req?: express.Request, res?: express.Response) => Promise<JsonSerializable>;
}

export interface PostHandler {
    getPath: () => string;
    handle: (req?: express.Request, res?: express.Response) => Promise<JsonSerializable>;
}

export interface PutHandler {
    getPath: () => string;
    handle: (req?: express.Request, res?: express.Response) => Promise<JsonSerializable>;
}

export interface DeleteHandler {
    getPath: () => string;
    handle: (req?: express.Request, res?: express.Response) => Promise<JsonSerializable>;
}

export const registerGetHandler = (app: express.Express, handler: GetHandler, version: number = 1): void => {
    app.get(`/v${version}${handler.getPath()}`, (req: express.Request, res: express.Response) => {
        handler.handle(req, res).then(result => {
            res.send(result);
        });
    });
};

export const registerPostHandler = (app: express.Express, handler: PostHandler, version: number = 1): void => {
    app.post(`/v${version}${handler.getPath()}`, (req: express.Request, res: express.Response) => {
        handler.handle(req, res).then(result => {
            res.send(result);
        });
    });
};

export const registerPutHandler = (app: express.Express, handler: PostHandler, version: number = 1): void => {
    app.put(`/v${version}${handler.getPath()}`, (req: express.Request, res: express.Response) => {
        handler.handle(req, res).then(result => {
            res.send(result);
        });
    });
};

export const registerDeleteHandler = (app: express.Express, handler: PostHandler, version: number = 1): void => {
    app.delete(`/v${version}${handler.getPath()}`, (req: express.Request, res: express.Response) => {
        handler.handle(req, res).then(result => {
            res.send(result);
        });
    });
};
