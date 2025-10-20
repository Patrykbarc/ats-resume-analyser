import dotenv from "dotenv"
import express, { type Express } from "express"
import middleware from "./middleware/middleware"
import { routes } from "./routes/routes"

dotenv.config()

const app: Express = express()

middleware(app, () => routes(app))

export default app
