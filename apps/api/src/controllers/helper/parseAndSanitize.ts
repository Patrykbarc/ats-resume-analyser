import * as PDFParse from "@monorepo/pdf-parse"
import sanitize from "sanitize-html"

export const parseAndSanitize = async (buffer: Buffer) => {
	const uint8ArrayData: Uint8Array = new Uint8Array(buffer)

	const parser = new PDFParse.PDFParse({ data: uint8ArrayData })

	const textResult = await parser.getText()

	return sanitize(textResult.text)
}
