import nodemailer from "nodemailer";
// import config from "config";
require("dotenv").config();

export const sendEmail = (email: string, subject: string, message: string) => {

	const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.LOGIN as string,
          pass: process.env.PASSWORD as string
        },
      });

      const mailOptions = {
        from: process.env.LOGIN as string,
        to: process.env.EMAIL as string,
        subject: `${subject} - ${email}`,
        text: message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
};
