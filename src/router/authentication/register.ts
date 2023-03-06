import objVerify from "../../../lib/objSchema/userpw";
import { DefaultResponse } from "../../../index";
import { HTTPError } from "../../../lib/errorschema";
import user from "../../../lib/dbSchema/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default async (req: Request, res: Response) => {
	try {
		const validate = objVerify.validate(req.body);
		if (validate.error)
			throw new HTTPError("Invalid Parameters", 400, "INVALIDPARAM", undefined);
		const newUsername = req.body.username;
		const newPassword = req.body.password;

		const validateExisting = await user.find({ username: newUsername });
		if (validateExisting.length !== 0)
			throw new HTTPError("Duplicate User", 422, "DUPLICATEUSER", undefined);
		const hashFunction: [Error | undefined, string] = await new Promise(
			(resolve, reject) => {
				bcrypt.hash(newPassword, 8, (err: Error | undefined, hash: string) => {
					if (err) reject([err, undefined]);
					resolve([undefined, hash]);
				});
			}
		);
		if (hashFunction[0])
			throw new HTTPError("Hash Error", 500, "INTERNALERROR", undefined);
		const dbSave = await user.create({
			username: newUsername,
			passwordHash: hashFunction[1],
			userType: 0,
			createdAt: new Date(),
		});
		if (!dbSave)
			throw new HTTPError("Database Error", 500, "INTERNALERROR", undefined);
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
		} as DefaultResponse);
	} catch (e: any) {
		return res.status(e.status).json({
			message: e.message,
			status: e.status,
			code: e.code,
			data: e.error,
		});
	}
};
