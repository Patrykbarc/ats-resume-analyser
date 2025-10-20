import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB
const ACCEPTED_FILE_TYPES = ["application/pdf"]

export const FileSchema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE
		})
		.refine((file) => {
			return !file || ACCEPTED_FILE_TYPES.includes(file.type)
		}),
})

export type User = z.infer<typeof FileSchema>
