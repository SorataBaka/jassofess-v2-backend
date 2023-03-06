"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const baseRouter_1 = __importDefault(require("./router/baseRouter"));
dotenv_1.default.config();
const PORT = +process.env.PORT || 3000;
const URI = process.env.MONGO_URI || undefined;
if (!URI)
    throw new Error("MongoDB URI not found");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(baseRouter_1.default);
const handleDatabse = async () => {
    mongoose_1.default.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    });
    mongoose_1.default.connection.on("error", (error) => {
        console.log(error);
    });
    await mongoose_1.default.connect(URI);
};
app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
    handleDatabse();
});
