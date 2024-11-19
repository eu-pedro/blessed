import fastify from 'fastify'
import { env } from './env'
import { scheduleDailyEmail } from './infra/cron/email-schedule'

const app = fastify({
  logger: true
})


async function startServer() {
  await scheduleDailyEmail()

  app.listen({
    port: env.PORT,
    host: '0.0.0.0',
  })

  console.log("Server is running")
}

startServer().catch(err => {
  console.error(err)
})