// import { MessageDto } from "src/dtos/message.dto";
import { sendEmail } from "../utils/email/email";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../entity/message.entity";

export class MessageService {
	async createMessage(
		messageObj: any
	): Promise<{ success: boolean; message: string; data?: any }> {
		// public createMessage(messageObj: MessageDto): Promise<{ success: boolean; message: string; }> {

		if (!messageObj) {
			return { success: false, message: "Message successfully sent." };
		}

		// Apply id to record
		messageObj._id = uuidv4();

		try {
			const res = await Message.create(messageObj);

			sendEmail(messageObj.email, messageObj.subject, messageObj.message);

			return {
				success: true,
				message: "Message successfully sent.",
				data: res,
				test: " test "
			};
		} catch (error) {
			return { success: false, message: error as string };
		}
	}
}
