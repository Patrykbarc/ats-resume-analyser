import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const verifyApiKey = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const NODE_ENV = process.env.NODE_ENV
	const API_KEY = process.env.API_KEY

	if (NODE_ENV === "test") {
		return next()
	}

	const authHeader = req.headers["authorization"]
	const apiKey = authHeader?.slice(7)

	if (API_KEY !== apiKey) {
		return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid api key" })
	}

	next()
}
