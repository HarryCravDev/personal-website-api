import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	replied: {
		type: Boolean,
		default: false,
		required: false,
	},
});

export const Message = mongoose.model("Message", MessageSchema);
