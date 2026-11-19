import dns from 'node:dns'
import { env } from './config/env.js'
import app from './app.js'
import connectDB from './config/db.js'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const start = async () => {
  await connectDB()
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} (${env.nodeEnv})`)
  })
}

start()