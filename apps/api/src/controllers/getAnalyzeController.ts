import type { FastifyReply, FastifyRequest } from "fastify"
import { analyseFile } from "./helper/analyseFile"
import { parseAndSanitize } from "./helper/parseAndSanitize"
import { streamToBuffer } from "./helper/streamToBuffer"

export const getAnalyze = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = await request.file()

	if (!data) {
		return reply.status(400).send({ error: "No file sent." })
	}

	try {
		const buffer = await streamToBuffer(data.file)

		data.file.destroy()

		const sanitizedTextResult = await parseAndSanitize(buffer)

		const analysedFile = await analyseFile(sanitizedTextResult)

		return reply.send(analysedFile)
	} catch (error) {
		console.error("Error while processing the file:", error)

		if (data.file && !data.file.destroyed) {
			data.file.destroy()
		}
		return reply.status(500).send({ error: "The file could not be processed." })
	}
}
