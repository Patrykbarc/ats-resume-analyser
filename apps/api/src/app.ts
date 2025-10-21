import dotenv from "dotenv"
import express, { type Express } from "express"
import middleware from "./middleware/middleware"

dotenv.config()

const app: Express = express()

middleware(app)

export default app
