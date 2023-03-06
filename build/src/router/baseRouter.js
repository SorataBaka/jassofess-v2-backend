"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationrouter_1 = __importDefault(require("./authentication/authenticationrouter"));
const baseRouter = express_1.default.Router();
baseRouter.use("/auth", authenticationrouter_1.default);
baseRouter.all("/", (_req, res) => {
    return res.json({
        message: "OK",
        status: 200,
        code: "OK",
        data: {},
    });
});
exports.default = baseRouter;
