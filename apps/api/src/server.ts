import cors from "@fastify/cors"
import multipart from "@fastify/multipart"
import Fastify from "fastify"
import { getAnalyze } from "./controllers/getAnalyzeController"

const server = Fastify({ logger: true })

server.register(cors)
server.register(multipart)

server.post(
	"/api/analyze",
	async (request, reply) => await getAnalyze(request, reply),
)

server.listen({ port: 8080 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
