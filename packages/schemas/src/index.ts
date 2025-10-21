import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3
const ACCEPTED_MIME_TYPES = ["application/pdf"] 

export const FileSchema = z.object({
    size: z.number().refine(
        (size) => size <= MAX_UPLOAD_SIZE,
        `The maximum file size is ${MAX_UPLOAD_SIZE / (1024 * 1024)}MB.`,
    ),
    mimetype: z.string().refine(
        (mimetype) => ACCEPTED_MIME_TYPES.includes(mimetype),
        `Accepted file types: ${ACCEPTED_MIME_TYPES.join(", ")}.`,
    ),
    fieldname: z.string().optional(), 
    originalname: z.string().optional(),
    encoding: z.string().optional(),
})


export type FileUploadData = z.infer<typeof FileSchema>
