import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import baseRouter from "./router/baseRouter";

dotenv.config();
const PORT: number = +(process.env.PORT as string) || 3000;
const URI: string | undefined = (process.env.MONGO_URI as string) || undefined;
if (!URI) throw new Error("MongoDB URI not found");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(baseRouter);

const handleDatabse = async () => {
	mongoose.connection.on("connected", () => {
		console.log("Connected to MongoDB");
	});
	mongoose.connection.on("error", (error: Error) => {
		console.log(error);
	});
	await mongoose.connect(URI);
};

app.listen(PORT, () => {
	console.log("Listening on PORT " + PORT);
	handleDatabse();
});
