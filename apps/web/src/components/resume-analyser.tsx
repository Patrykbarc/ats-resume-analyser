"use client"

import type { AiAnalysis } from "@monorepo/types"
import axios from "axios"
import { StatusCodes } from "http-status-codes"
import { FileText, Sparkles, Upload } from "lucide-react"
import type React from "react"
import { useId, useState } from "react"
import { AnalysisResults } from "@/components/analysis-results"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export function ResumeAnalyser() {
	const [file, setFile] = useState<File | null>(null)
	const [analyzing, setAnalyzing] = useState(false)
	const [analysis, setAnalysis] = useState<AiAnalysis | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const id = useId()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]

		if (selectedFile) {
			setFile(selectedFile)
			setAnalysis(null)
		}
	}

	const handleAnalyse = async () => {
		if (!file) return

		setAnalyzing(true)
		setErrorMessage(null)

		try {
			const formData = new FormData()
			formData.append("file", file)

			const response = await axios.post(`${API_URL}/api/analyze`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `bearer ${API_KEY}`,
				},
			})

			if (response.status === StatusCodes.OK) {
				setAnalysis(JSON.parse(response.data.analysedFile))
			}
		} catch (error) {
			console.error("Error analyzing resume:", error)
			setErrorMessage("The file seems to not be a CV.")
		} finally {
			setAnalyzing(false)
		}
	}

	const handleReset = () => {
		setFile(null)
		setAnalysis(null)
	}

	return (
		<div className="space-y-8">
			{!analysis ? (
				<Card className="border-border bg-card p-8">
					<div className="flex flex-col items-center justify-center space-y-6">
						{!file ? (
							<>
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
									<Upload className="h-10 w-10 text-muted-foreground" />
								</div>

								<div className="text-center">
									<h2 className="mb-2 text-xl font-semibold text-foreground">
										Upload Your Resume
									</h2>
									<p className="text-sm text-muted-foreground">
										PDF, DOC, or DOCX format
									</p>
								</div>

								<label htmlFor={id}>
									<Button asChild>
										<span className="cursor-pointer">Choose File</span>
									</Button>
									<input
										id={id}
										type="file"
										accept=".pdf,.doc,.docx"
										onChange={handleFileChange}
										className="sr-only"
									/>
								</label>
							</>
						) : (
							<>
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
									<FileText className="h-10 w-10 text-accent" />
								</div>

								<div className="text-center">
									<h2 className="mb-2 text-xl font-semibold text-foreground">
										{file.name}
									</h2>
									<p className="text-sm text-muted-foreground">
										{(file.size / 1024).toFixed(2)} KB
									</p>
								</div>

								<div className="flex gap-3">
									<Button
										onClick={handleAnalyse}
										disabled={analyzing}
										className="bg-accent text-accent-foreground hover:bg-accent/90"
									>
										{analyzing ? (
											<>
												<Sparkles className="mr-2 h-4 w-4 animate-spin" />
												Analyzing...
											</>
										) : (
											<>
												<Sparkles className="mr-2 h-4 w-4" />
												Analyze Resume
											</>
										)}
									</Button>

									<Button
										onClick={handleReset}
										variant="outline"
										disabled={analyzing}
									>
										Cancel
									</Button>
								</div>
							</>
						)}
					</div>
					{errorMessage && (
						<p className="text-center text-rose-400">{errorMessage}</p>
					)}
				</Card>
			) : (
				<AnalysisResults analysis={analysis} onReset={handleReset} />
			)}
		</div>
	)
}
