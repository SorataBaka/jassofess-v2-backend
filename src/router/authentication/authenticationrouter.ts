import express from "express";
import { Request, Response } from "express";
import { DefaultResponse } from "../../..";
import register from "./register";

const authenticationRouter = express.Router();

authenticationRouter.post("/register", register);
authenticationRouter.all("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		message: "OK",
		code: "OK",
		status: 200,
		data: {},
	} as DefaultResponse);
});
export default authenticationRouter;
