"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./register"));
const authenticationRouter = express_1.default.Router();
authenticationRouter.post("/register", register_1.default);
authenticationRouter.all("/", (_req, res) => {
    return res.status(200).json({
        message: "OK",
        code: "OK",
        status: 200,
        data: {},
    });
});
exports.default = authenticationRouter;
