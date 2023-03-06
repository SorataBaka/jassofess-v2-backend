import Joi from "joi";
export default Joi.object({
	username: Joi.string().alphanum().min(5).max(10),
	password: Joi.string()
		.alphanum()
		.pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
		.required(),
});
