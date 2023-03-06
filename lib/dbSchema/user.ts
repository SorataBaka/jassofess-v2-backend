import mongoose from "mongoose";
const schema = new mongoose.Schema({
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
export default mongoose.model("site-users", schema);
