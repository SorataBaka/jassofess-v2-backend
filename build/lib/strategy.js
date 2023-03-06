"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("./dbSchema/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = new passport_local_1.Strategy((username, password, done) => {
    user_1.default
        .find({ username })
        .then((result) => {
        if (result.length === 0)
            done("User Not Found");
        const hash = result[0].passwordHash;
        bcrypt_1.default.compare(password, hash, function (err, isMatch) {
            if (!isMatch)
                done("Invalid Credentials", null);
            done(undefined, result[0]);
        });
    })
        .catch((err) => {
        done(err, null);
    });
});
