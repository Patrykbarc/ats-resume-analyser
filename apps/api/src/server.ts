import cors from "@fastify/cors"
import type { User } from "@monorepo/schemas"
import fastify from "fastify"

const server = fastify()

server.register(cors)

server.get("/", async (req, res) => {
	const user: User = {
		username: "hello",
	}

	return { user }
})

server.listen({ port: 8080 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
