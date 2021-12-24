import { Request } from "express";
import jwt = require("jsonwebtoken");
import config from "config";

export class AuthenticationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthenticationError";
	}
}

function authenticationError(message: string) {
	throw new AuthenticationError(message);
}

export function expressAuthentication(
	request: Request,
	securityName: string,
	scopes?: string[]
): Promise<any> {
	const token =
		request.body.token ||
		request.query.token ||
		request.headers["authorization"];

	return new Promise((resolve, reject) => {
		if (!token) {
			reject(authenticationError("No authentication token provided"));
		}

		if (securityName !== "jwt") {
			reject(
				authenticationError(
					"Authentication is not set up for that type of token"
				)
			);
		}

		jwt.verify(
			token.split("Bearer ")[1],
			config.get("app.secret"),
			function (err: any, decoded: any) {
				if (err) {
					reject(err);
				} else {
					if (scopes) {
						for (const scope of scopes) {
							if (!decoded.scopes.includes(scope)) {
								reject(
									authenticationError("Token does not contain required scope.")
								);
							}
						}
					}
					resolve(decoded);
				}
			}
		);
	});
}
