import nodemailer from "nodemailer";
// import config from "config";
require("dotenv").config();

console.log("Data: ", process.env.CLIENTID);

export const sendEmail = (email: string, subject: string, message: string) => {
	// Run nodemailed
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.EMAIL as string,
			accessToken: "",
			clientId: process.env.CLIENTID as string,
			clientSecret: process.env.CLIENTSECRET as string,
			refreshToken: process.env.REFRESHTOKEN as string,
		},
	});

	let mailOptions = {
		from: process.env.EMAIL as string,
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
