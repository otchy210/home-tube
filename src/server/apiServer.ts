import express from 'express';
import { registerGetHandler } from './handlers/Handler';
import { getPing } from './handlers/ping';
import { getSettings } from './handlers/settings';

export const start = (port: number): void => {
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

    registerGetHandler(app, getPing);
    registerGetHandler(app, getSettings);

    app.listen(port);
    console.log(`API server running on the port ${port}. Ctrl+C to stop.`);
};