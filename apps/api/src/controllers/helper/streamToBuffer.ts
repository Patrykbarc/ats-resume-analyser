export const streamToBuffer = (
	stream: NodeJS.ReadableStream,
): Promise<Buffer> => {
	return new Promise((resolve, reject) => {
		const chunks: Uint8Array[] = []
		stream.on("data", (chunk) => chunks.push(chunk))
		stream.on("error", (err) => reject(err))
		stream.on("end", () => resolve(Buffer.concat(chunks)))
	})
}
