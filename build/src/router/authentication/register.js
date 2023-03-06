"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userpw_1 = __importDefault(require("../../../lib/objSchema/userpw"));
const errorschema_1 = require("../../../lib/errorschema");
const user_1 = __importDefault(require("../../../lib/dbSchema/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = async (req, res) => {
    try {
        const validate = userpw_1.default.validate(req.body);
        if (validate.error)
            throw new errorschema_1.HTTPError("Invalid Parameters", 400, "INVALIDPARAM", undefined);
        const newUsername = req.body.username;
        const newPassword = req.body.password;
        const validateExisting = await user_1.default.find({ username: newUsername });
        if (validateExisting.length !== 0)
            throw new errorschema_1.HTTPError("Duplicate User", 422, "DUPLICATEUSER", undefined);
        const hashFunction = await new Promise((resolve, reject) => {
            bcrypt_1.default.hash(newPassword, 8, (err, hash) => {
                if (err)
                    reject([err, undefined]);
                resolve([undefined, hash]);
            });
        });
        if (hashFunction[0])
            throw new errorschema_1.HTTPError("Hash Error", 500, "INTERNALERROR", undefined);
        const dbSave = await user_1.default.create({
            username: newUsername,
            passwordHash: hashFunction[1],
            userType: 0,
            createdAt: new Date(),
        });
        if (!dbSave)
            throw new errorschema_1.HTTPError("Database Error", 500, "INTERNALERROR", undefined);
        return res.status(200).json({
            message: "OK",
            status: 200,
            code: "OK",
            data: {
                username: dbSave.username,
                userType: dbSave.userType,
                createdAt: dbSave.createdAt,
                id: dbSave._id,
            },
        });
    }
    catch (e) {
        return res.status(e.status).json({
            message: e.message,
            status: e.status,
            code: e.code,
            data: e.error,
        });
    }
};
