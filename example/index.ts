import { config } from 'dotenv';
config();

console.log('asd');

import express, { Express } from 'express';

import { OsintRouteGroup } from './routes';
import { LocalCache, GlobalConfig } from '../lib';

GlobalConfig.cache = new LocalCache().setElementLifetime(60 * 60 * 1000);

/**
 * Initializes the RouteGroup instance and app instance
 * Define host and port constants
 */
const app: Express = express();

app.use(express.json());

const host: string = process.env.HOST || '127.0.0.1';
const port: number = parseInt(process.env.PORT) || 3000;

console.log('asd');

/*
 * Add existing route to our RouteGroup instance and register router
 */
OsintRouteGroup.registerMiddleware(app);

OsintRouteGroup.registerRoutes(app).then(() => {
    /**
     * Listens for connections on the provided hostname and port
     */

    app.listen(port, host, () => {
        console.log(`Server started on http://${host}:${port}!`);
    });
});
