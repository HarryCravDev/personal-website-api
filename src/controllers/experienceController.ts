// src/users/usersController.ts
import { ExperienceService } from "../services/experienceService";
import { Controller, Get, Route, SuccessResponse } from "tsoa";

@Route("experience")
export class ExperienceController extends Controller {
	@SuccessResponse("201", "Get experience.") // Custom success response
	@Get()
	public async getExperience(): Promise<any> {
		this.setStatus(201); // set return status 201

		const res = await new ExperienceService().getExperience();

		if (!res.success) {
			return res;
		}

		return res;
	}
}
