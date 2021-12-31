export class Validation {
	async validateEmailExists(email: string, entity: any) {
		const emailRecord = await entity.findOne({ email });

		if (emailRecord) {
			return { success: false, message: "Email already in DB." };
		}

		return { success: true, message: "Email added to the DB." };
	}
}
