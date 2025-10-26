import { promises as fs } from "node:fs"
import type { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { analyseFile } from "./helper/analyseFile"
import { parseAndSanitize } from "./helper/parseAndSanitize"

export const getAnalyze = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const file = req.file

	if (!file) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ status: StatusCodes.BAD_REQUEST, error: "No file sent." })
	}

	try {
		let buffer: Buffer

		if (file.buffer) {
			buffer = file.buffer
		} else if (file.path) {
			buffer = await fs.readFile(file.path)

			await fs.unlink(file.path)
		} else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				status: StatusCodes.BAD_REQUEST,
				error: "Unsupported file upload method.",
			})
		}

		const sanitizedTextResult = await parseAndSanitize(buffer)
		const analysedFile = await analyseFile(sanitizedTextResult)

		if ("error" in JSON.parse(analysedFile)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: "The file seems to not be a CV.",
			})
		}

		return res
			.status(StatusCodes.OK)
			.json({ status: StatusCodes.OK, analysedFile: JSON.parse(analysedFile) })
	} catch (error) {
		console.error("Error while processing the file:", error)

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			error: "The file could not be processed.",
		})
	}
}
