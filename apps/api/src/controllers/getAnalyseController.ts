import type { AiAnalysis } from "@monorepo/types"
import type { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"
import { analyseFile } from "./helper/analyseFile"
import { parseAndSanitize } from "./helper/parseAndSanitize"
import { streamToBuffer } from "./helper/streamToBuffer"

type ErrorRes = { status: number; error: string }
type Response = { status: StatusCodes.OK; data: AiAnalysis } | ErrorRes

export const getAnalyze = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<Response> => {
	const data = await request.file()

	if (!data) {
		return reply
			.status(400)
			.send({ status: StatusCodes.BAD_REQUEST, error: "No file sent." })
	}

	try {
		const buffer = await streamToBuffer(data.file)

		data.file.destroy()

		const sanitizedTextResult = await parseAndSanitize(buffer)

		const analysedFile = await analyseFile(sanitizedTextResult)

		if ("error" in JSON.parse(analysedFile)) {
			return reply.send({
				status: StatusCodes.BAD_REQUEST,
				error: "The file seems to not be a CV.",
			})
		}

		return reply.send({ status: StatusCodes.OK, analysedFile })
	} catch (error) {
		console.error("Error while processing the file:", error)

		if (data.file && !data.file.destroyed) {
			data.file.destroy()
		}

		return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			error: "The file could not be processed.",
		})
	}
}
