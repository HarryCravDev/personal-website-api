import nodemailer from "nodemailer";
import config from "config";

export const sendEmail = (email: string, subject: string, message: string) => {
	// Run nodemailed
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: config.get("nodemailer.auth.email") as string,
			accessToken: "",
			clientId: config.get("nodemailer.auth.clientId") as string,
			clientSecret: config.get("nodemailer.auth.clientSecret") as string,
			refreshToken: config.get("nodemailer.auth.refreshToken") as string,
		},
	});

	let mailOptions = {
		from: config.get("nodemailer.auth.email") as string,
		to: email,
		subject: subject,
		text: message,
	};

	transporter.sendMail(mailOptions, function (err: any, data: any) {
		if (err) {
			console.log("Error " + err);
			return { success: false, message: err };
		} else {
			console.log({ data });
			return { success: true, message: "Email sent successfully." };
		}
	});
};
