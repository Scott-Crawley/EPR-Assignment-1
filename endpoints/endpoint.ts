import * as log from '../core/logging';
import { Application as App } from 'express';

const p = log.prefix;

export class Endpoint {
    
    path: string = "";
    app:  App;

    constructor(_path: string, _app: App) {
        this.path = _path;
        this.app  = _app;
    }

    static ctor(_app: App): void {
        this.ctor(_app);
    }

    async register(): Promise<void> {
        if (this.app == null) {
            log.out(p.ERROR, `Failed to register ${this.path}: 'app' was null!`);
            return;
        }
        await this.setupListeners();
        log.out(p.INFO, `Registered endpoints for: ${this.path}`);
    }

    async setupListeners(): Promise<void> {
        this.setupListeners();
    }
}