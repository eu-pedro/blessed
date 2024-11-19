import cron from 'node-cron'
import { SendDailyEmailUseCase } from "@/application/usecases/send-daily-email";
import { NodeMailerService } from "../services/node-mailer-service";
import { PrismaUsersRepository } from "@/application/repository/prisma/prisma-users-repository";

let isRunning = false;
export async function scheduleDailyEmail() {
  const emailService = new NodeMailerService()
  const usersRepository = new PrismaUsersRepository()
  const sendDailyEmailUseCase = new SendDailyEmailUseCase(usersRepository, emailService)

  await sendDailyEmailUseCase.execute()
  cron.schedule("6 6 * * *", async () => {

    if (isRunning) {
      console.log("Processo ainda em execução. Aguardando...");
      return;
    }

    console.log("Iniciando envio de e-mails...");
    isRunning = true;

    try {
      await sendDailyEmailUseCase.execute();
    } catch (error) {
      console.error("Erro ao enviar e-mails:", error);
    } finally {
      isRunning = false;
    }
  }, {
    timezone: "America/Sao_Paulo"
  })
} 