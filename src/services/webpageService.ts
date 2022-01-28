// import { sendEmail } from "../utils/email/email";
import { Subscribe } from "../entity/subscribe.entity";
import { Validation } from "../utils/validation/Validation";
import { v4 as uuidv4 } from "uuid";

export class WebpageService {
	async createEmailSubscription(
		email: string
	): Promise<{ success: boolean; message: string }> {
		if (!email) {
			return { success: false, message: "No email found." };
		}

		const validation = await new Validation().validateEmailExists(
			email,
			Subscribe
		);

		if (!validation.success) {
			return { success: false, message: "Email already subscribed." };
		}

		try {
			const res = await Subscribe.create({ _id: uuidv4(), email });
			// sendEmail(email, "Subscription created!", "Thank you!");
			return { success: true, message: "Subscription successfully sent." };
		} catch (error) {
			return { success: false, message: error as string };
		}
	}
}
