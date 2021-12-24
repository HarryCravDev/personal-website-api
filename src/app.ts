// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import { errorHandler } from "./utils/errorHandling/errorHandler.util";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import config from "config";

const run = async () => {
	const app = express();

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

	RegisterRoutes(app);

	app.use(errorHandler);

	const port = config.get("app.port") || 3000;

	app.listen(port, () =>
		console.log(`Example app listening at http://localhost:${port} `)
	);
};

run();
