// src/users/usersController.ts
import { Body, Controller, Post, Get, Route, SuccessResponse } from "tsoa";
import { WebpageService } from "../services/webpageService";
import { ExperienceService } from "../services/experienceService";
import { MessageService } from "../services/messageService";
import { MessageDto } from "../dtos/message.dto";

@Route("api/v1")
export class WebpageController extends Controller {
	@SuccessResponse("201", "Get experience.") // Custom success response
	@Get("experience")
	public async getExperience(): Promise<any> {
		this.setStatus(201); // set return status 201

		const res = await new ExperienceService().getExperience();

		if (!res.success) {
			return res;
		}

		return res;
	}

	@SuccessResponse("201", "Subscription created.")
	@Post("subscribe")
	public async createEmailSubscription(
		@Body() body: { email: string }
	): Promise<any> {
		const { email } = body;

		this.setStatus(201); // set return status 201
		const res = await new WebpageService().createEmailSubscription(email);

		if (!res.success) {
			this.setStatus(400);
			return res;
		}

		return res;
	}

	@SuccessResponse("201", "Message successfully sent.")
	@Post("message")
	public async createMessage(@Body() requestBody: MessageDto): Promise<any> {
		this.setStatus(201); // set return status 201

		const res = await new MessageService().createMessage(requestBody);

		return res;
	}
}
