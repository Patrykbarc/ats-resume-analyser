import type { AiAnalysis, AiAnalysisError } from "@monorepo/types"
import axios, { type AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import { getEnv } from "@/lib/getEnv"

export type AnalyseResult =
	| { success: true; data: AiAnalysis }
	| { success: false; error: string }

export const analyseResume = async (file: File): Promise<AnalyseResult> => {
	try {
		const env = getEnv()

		if (!file) {
			return {
				success: false,
				error: "No file selected",
			}
		}

		if (file.type !== "application/pdf") {
			return {
				success: false,
				error: "Invalid file format. Only PDF files are allowed.",
			}
		}

		const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
		if (file.size > MAX_FILE_SIZE) {
			return {
				success: false,
				error: "The file is too large. The maximum size is 10MB.",
			}
		}

		const formData = new FormData()
		formData.append("file", file)

		const response = await axios.post<AiAnalysis>(
			`${env.API_URL}/api/analyze`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		)

		if (response.status === StatusCodes.OK) {
			return {
				success: true,
				data: response.data,
			}
		}

		return {
			success: false,
			error: "Unexpected response status",
		}
	} catch (error) {
		const axiosError = error as AxiosError<AiAnalysisError>

		if (axiosError.response?.data?.error) {
			return {
				success: false,
				error: axiosError.response.data.error,
			}
		}

		if (axiosError.code === "ECONNREFUSED") {
			return {
				success: false,
				error: "Unable to connect to the API server",
			}
		}

		if (axiosError.code === "ECONNABORTED") {
			return {
				success: false,
				error: "Connection timeout exceeded",
			}
		}

		return {
			success: false,
			error: axiosError.message || "An unexpected error has occurred",
		}
	}
}
