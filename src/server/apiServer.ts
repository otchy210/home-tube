import express from 'express';

export const start = (port: number, version: number = 1): void => {
    const app: express.Express = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // CROS for local use only
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

    app.get(`/v${version}/ping`, (req: express.Request, res: express.Response) => {
        res.send(true);
    });

    app.listen(port);
    console.log(`API server running on the port ${port}. Ctrl+C to stop.`);
};