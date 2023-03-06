import { Strategy as LocalStrategy } from "passport-local";
import { DoneCallback } from "passport";
import user from "./dbSchema/user";
import bcrypt from "bcrypt";
export default new LocalStrategy(
	(username: string, password: string, done: DoneCallback) => {
		user
			.find({ username })
			.then((result) => {
				if (result.length === 0) done("User Not Found");
				const hash = result[0].passwordHash;
				bcrypt.compare(
					password,
					hash,
					function (err: Error | undefined, isMatch: boolean) {
						if (!isMatch) done("Invalid Credentials", null);
						done(undefined, result[0]);
					}
				);
			})
			.catch((err: Error) => {
				done(err, null);
			});
	}
);
