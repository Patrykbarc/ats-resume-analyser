import type { NextFunction, Request, Response } from "express"

interface AppError extends Error {
	status?: number
}

export const errorHandler = (
	err: AppError,
	_: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(err.status || 500).json({
		message: err.message || "Internal Server Error",
	})

	next()
}
