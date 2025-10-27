import app from "./app"
import config from "./config/config"

app.get('/health', (_, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`)
})
