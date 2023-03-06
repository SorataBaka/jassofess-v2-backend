"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
class HTTPError extends Error {
    code;
    status;
    error;
    constructor(message, status, code, error) {
        super(message);
        this.code = code;
        this.status = status;
        this.error = error;
    }
}
exports.HTTPError = HTTPError;
