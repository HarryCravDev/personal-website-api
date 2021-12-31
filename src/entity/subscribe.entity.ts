import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubscribeSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	added: {
		type: Boolean,
		default: false,
		required: false,
	},
});

export const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
