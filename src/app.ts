// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import { errorHandler } from "./utils/errorHandling/errorHandler.util";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
// import config from "config";
import mongoose from "mongoose";

const run = async () => {
	const app = express();

	try {
		// console.log("Harryyyy : ", config.get("db.connectionDocker"));
		// const conn = await mongoose.connect(config.get("db.connectionDocker"));

		app.use(cors());

		app.use(helmet());

		app.use(compression());

		// Use body parser to read sent json payloads
		app.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);

		app.use(bodyParser.json());

		app.get("/", (req: express.Request, res: express.Response) => {
			return res.status(200).json({ success: true, message: "this test works" });
		});

		RegisterRoutes(app);
	} catch (error) {
		console.log("Process exited with error: ", error);
		process.exit(1);
	}

	app.use(errorHandler);

	// const port = config.get("app.port") || 3000;
	const port = 3000;

	app.listen(port, () =>
		console.log(`Example app listening at http://localhost:${port} 🥳`)
	);
};

run();
