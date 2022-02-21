#!/usr/bin/env node

"use strict";
const { WebServer } = require('../dist');

const port = process.env.HOME_TUBE_PORT || 80;
const webServer = new WebServer(port);
webServer.start().then(() => {
    webServer.showInitialMessages();
});
