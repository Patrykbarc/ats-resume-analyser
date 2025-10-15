import * as PDFParse from "@monorepo/pdf-parse"
import type { FastifyReply, FastifyRequest } from "fastify"

const streamToBuffer = (stream: NodeJS.ReadableStream): Promise<Buffer> => {
	return new Promise((resolve, reject) => {
		const chunks: Uint8Array[] = []
		stream.on("data", (chunk) => chunks.push(chunk))
		stream.on("error", (err) => reject(err))
		stream.on("end", () => resolve(Buffer.concat(chunks)))
	})
}

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
		const uint8ArrayData: Uint8Array = new Uint8Array(buffer)

		const parser = new PDFParse.PDFParse({ data: uint8ArrayData })

		const textResult = await parser.getText()

		data.file.destroy()

		const analysis = {
			extractedText: textResult.text,
			filename: data.filename,
		}

		return reply.send(analysis)
	} catch (error) {
		console.error("Error while processing the file:", error)

		if (data.file && !data.file.destroyed) {
			data.file.destroy()
		}
		return reply.status(500).send({ error: "The file could not be processed." })
	}
}
