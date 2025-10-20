import cors from "cors"
import type { Application } from "express"
import express from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import logger from "morgan"
import multer from "multer"
import { errorHandler } from "./errorHandler"
import { verifyApiKey } from "./verifyApiKey"

const upload = multer({ storage: multer.memoryStorage() })

const multipartParser = upload.single("file")

export const middleware = (app: Application, routes: () => void) => {
	app.use(helmet())
	app.use(cors(corsOptions))
	app.use(logger("dev"))
	app.use("/api", limiter)

	app.use(multipartParser)

	app.use(express.json())
	app.use(verifyApiKey)

	routes()
	app.use(errorHandler)
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 min
	max: 100,
	message: {
		error: "Too many requests, please try again later.",
	},
})

const corsOptions = {
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	credentials: true,
	optionsSuccessStatus: 200,
}

export default middleware
