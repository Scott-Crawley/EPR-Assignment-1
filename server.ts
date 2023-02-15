// Endpoints
import { Endpoint } from './endpoints/endpoint';

import * as log from './core/logging';
import express from 'express';
import https from 'https';
import fs from 'fs';

import { _Request } from './entities/Request';
import { connect } from './core/database';

export const config = require('./config.json');
export const debug  = config.debug;
export const port   = config.port;

const app = express();
const p = log.prefix;

var server: any = null;
var regPromises: Array<Promise<void>> = [];

function initialise(): void {
    log.out(p.INFO, `Port: ${port}`);
    log.out(p.INFO, `Debug Enabled: ${debug}\n`);
    
    if (!connect()) {
        log.out(p.ERROR, `Database connection failure!`);
        return;
    }

    setupCapturing();
    setupEndpoints();
    
    var registerResults = Promise.all(regPromises);
    registerResults.then(
        function onfulfilled() {
            const options = initialiseHttps();
            startServer(options);
        },
        function onrejected() {
            log.out(p.ERROR, `Failed to register one or more endpoints!`);
        }
    ); 
}

async function setupEndpoints(): Promise<void> {
    var endpoints: Array<Endpoint> = [];
    endpoints.push();
    
    for (const endpoint of endpoints) {
        regPromises.push(endpoint.register());
    }
}

// Capture all requests to https://localhost:{port}
function setupCapturing(): void {
    app.use(express.json({ type: "application/json", limit: '25mb'}));

    // Runs on all requests
    app.use(async (req, res, next) => {
        const request = _Request.createFromExpressReq(req);
        const output = debug ? request : request.reducedDetail();
        log.out(p.INFO, `${output}`);

        next();
    });
}

function initialiseHttps(): Object {
    const crt = fs.readFileSync('./certs/ssl.crt');
    const key = fs.readFileSync('./certs/ssl.key');
    return {
        key: key,
        cert: crt
    }
}

function startServer(options: Object): void {
    server = https.createServer(options, app);
    server.listen(port, () => {
        var host = server.address().address;
        const port = server.address().port;
        if (host == "::") host = "localhost";
        log.out(p.INFO, `Service started on https://${host}:${port}/\n`);
    });
}

initialise();