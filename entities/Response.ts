export class Response {

    code: number;
    data: any;

    constructor(_code: number, _data: any) {
        this.code = _code;
        this.data = _data;
    }
}