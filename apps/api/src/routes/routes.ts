import type { Application } from "express"
import analyzeRoutes from "./analyzeRoutes"

export const routes = (app: Application) => {
	app.use("/api/analyze", analyzeRoutes)
}
