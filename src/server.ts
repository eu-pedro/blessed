import { env } from './env'
import { scheduleDailyEmail } from './infra/cron/email-schedule'
import { app } from './app'


app.listen({
  port: env.PORT,
  host: '0.0.0.0',
}).then(async () => {
  console.log('Server is running!')
  await scheduleDailyEmail()
})
