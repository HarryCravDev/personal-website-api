import { MessageDto } from "src/dtos/message.dto";
import { sendEmail } from "../utils/email/email";

export class MessageService {
	async createMessage(
		messageObj: MessageDto
	): Promise<{ success: boolean; message: string }> {
		// public createMessage(messageObj: MessageDto): Promise<{ success: boolean; message: string; }> {

		if (!messageObj) {
			return { success: false, message: "Message successfully sent." };
		}

		sendEmail(messageObj.email, messageObj.subject, messageObj.message);

		return { success: true, message: "Message successfully sent." };
	}
}
