"use client"

import { AlertCircle, CheckCircle2, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const sections = [
	{
		title: "Strengths",
		icon: CheckCircle2,
		color: "text-green-500",
		content:
			"Strong technical skills section with relevant technologies. Clear work experience with quantifiable achievements.",
	},
	{
		title: "Areas for Improvement",
		icon: AlertCircle,
		color: "text-yellow-500",
		content:
			"Consider adding more specific metrics to demonstrate impact. Professional summary could be more concise and targeted.",
	},
	{
		title: "Recommendations",
		icon: Lightbulb,
		color: "text-accent",
		content:
			"Add keywords relevant to your target role. Include links to portfolio or GitHub. Ensure consistent formatting throughout.",
	},
]

type AnalysisResultsProps = {
	analysis: string
	onReset: () => void
}

export function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
				<Button onClick={onReset} variant="outline">
					Analyze Another
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-1">
				{sections.map((section) => {
					const Icon = section.icon
					return (
						<Card key={section.title} className="border-border bg-card p-6">
							<div className="mb-4 flex items-center gap-3">
								<Icon className={`h-6 w-6 ${section.color}`} />
								<h3 className="text-lg font-semibold text-foreground">
									{section.title}
								</h3>
							</div>
							<p className="leading-relaxed text-muted-foreground">
								{section.content}
							</p>
						</Card>
					)
				})}
			</div>

			<Card className="border-border bg-card p-6">
				<h3 className="mb-3 text-lg font-semibold text-foreground">
					Overall Score
				</h3>
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<div className="h-3 overflow-hidden rounded-full bg-secondary">
							<div
								className="h-full bg-accent transition-all duration-500"
								style={{ width: "78%" }}
							/>
						</div>
					</div>
					<span className="text-2xl font-bold text-accent">78/100</span>
				</div>
				<p className="mt-3 text-sm text-muted-foreground">
					Your resume is strong but has room for improvement. Focus on the
					recommendations above to increase your score.
				</p>
			</Card>
		</div>
	)
}
