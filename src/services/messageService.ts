// import { MessageDto } from "src/dtos/message.dto";
import { sendEmail } from "../utils/email/email";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../entity/message.entity";

export class MessageService {
	async createMessage(
		messageObj: any
	): Promise<void> {
		if (!messageObj) {
			throw new Error("Message object is empty.");
			// return { success: false, message: "Message successfully sent." };
		}

		// Apply id to record
		messageObj._id = uuidv4();

		const res = await Message.create(messageObj);

		sendEmail(messageObj.email, messageObj.subject, messageObj.message);
	}

}
