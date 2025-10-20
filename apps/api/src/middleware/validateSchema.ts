import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ZodError, type z } from "zod"

export function validateData(schema: z.ZodObject<any, any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body)
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.issues.map((issue: any) => ({
					...issue,
					path: issue.path[0],
				}))
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ error: "Invalid data", details: errorMessages })
			} else {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ error: "Internal Server Error" })
			}
		}
	}
}
