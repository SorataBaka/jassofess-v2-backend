import express from "express";
import { DefaultResponse } from "../..";
import { Request, Response } from "express";
import authenticationRouter from "./authentication/authenticationrouter";

const baseRouter = express.Router();
baseRouter.use("/auth", authenticationRouter);

baseRouter.all("/", (_req: Request, res: Response) => {
	return res.json({
		message: "OK",
		status: 200,
		code: "OK",
		data: {},
	} as DefaultResponse);
});

export default baseRouter;
