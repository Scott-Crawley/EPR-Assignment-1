import { Request } from 'express'

export class _Request {

    url:        string;
    method:     string;
    headers:    object;
    ip:         string;
    body:       any;

    constructor(_url: string, _method: string, _headers: object, _ip: string, _body: any) {
        this.url     = _url;
        this.method  = _method;
        this.headers = _headers;
        this.ip      = _ip;
        this.body    = _body;
    }

    static createFromExpressReq(req: Request): _Request {
        return new _Request(req.originalUrl, req.method, req.headers, req.ip, req.body);
    }

    getContentType(): string {
        return this.headers['content-type'];
    }

    reducedDetail(): string {
        const padMethod = this.method.padEnd(4, ' ');
        return `|${this.ip}| -- ${padMethod}|> ${this.url}`;
    }
}