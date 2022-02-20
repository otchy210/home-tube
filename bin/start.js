#!/usr/bin/env node

"use strict";
const { WebServer } = require('../dist');

const port = process.env.HOME_TUBE_PORT || 80;
const webServer = new WebServer(port);
webServer.start().then(() => {
    const apiServer = webServer.getApiServer();
    console.log('==== HomeTube ==================================================');
    console.log(`WebServer Running on http://localhost:${port}`);
    if (apiServer) {
        const apiPort = apiServer.getPort();
        const appConfigPath = apiServer.getAppConfigPath();
        console.log(`ApiServer running on http://localhost:${apiPort}`);
        console.log(`appConfigPath: ${appConfigPath}`);
    }
    console.log('Press Ctrl+C to stop the server');
    console.log('================================================================');
});
