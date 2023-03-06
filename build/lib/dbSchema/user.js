"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    userType: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
exports.default = mongoose_1.default.model("site-users", schema);
