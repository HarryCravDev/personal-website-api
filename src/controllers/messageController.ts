// src/users/usersController.ts
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { MessageService } from "../services/messageService";
import { MessageDto } from "../dtos/message.dto";

@Route("message")
export class MessageController extends Controller {
	@SuccessResponse("201", "Created") // Custom success response
	@Post()
	public async createMessage(@Body() requestBody: MessageDto): Promise<any> {
		console.log("Message trigger");
		this.setStatus(201); // set return status 201

		try {
			await new MessageService().createMessage(requestBody);
			
			return { success: true, message: "Message sent." };
			
		} catch (error: any) {
			this.setStatus(400);
			// todo - write and capture all errors here (set correct status codes for all errors)
			console.log("Error: ", error);
			return { success: false, message: error.message as string };
		}
	}
}
