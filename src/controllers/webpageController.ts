// src/users/usersController.ts
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { WebpageService } from "../services/webpageService";

@Route("subscribe")
export class WebpageController extends Controller {
	@SuccessResponse("201", "Created")
	@Post()
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
}
