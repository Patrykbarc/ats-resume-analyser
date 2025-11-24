import express, { type Express } from 'express'
import middleware from './middleware/middleware'

const app: Express = express()

middleware(app)

export default app
