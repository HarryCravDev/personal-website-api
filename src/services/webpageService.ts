import { sendEmail } from "../utils/email/email";
import { Subscribe } from "../entity/subscribe.entity";
import { v4 as uuidv4 } from "uuid";

export class WebpageService {
	async createEmailSubscription(
		email: string
	): Promise<{ success: boolean; message: string }> {
		if (!email) {
			return { success: false, message: "Message successfully sent." };
		}

		try {
			const res = await Subscribe.create({ _id: uuidv4(), email });
			sendEmail(email, "Subscription created!", "Thank you!");
			return { success: true, message: "Message successfully sent." };
		} catch (error) {
			return { success: false, message: error as string };
		}
	}
}
