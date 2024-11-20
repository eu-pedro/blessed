import { UsersRepository } from "@/application/repository/users-repository";
import { UseCase } from "./usecase";
import { IEmailService } from "../contracts/email-service";
import { VersesHistoryRepository } from "../repository/verses-history-repository";
import { verseService } from "@/infra/services/verse-service";

export class SendDailyEmailUseCase implements UseCase<any, void> {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly email: IEmailService,
    private readonly verseHistoryRepository: VersesHistoryRepository,
  ) {}

  async execute(): Promise<void> {
    const users = await this.userRepository.findAll();
    const subject = "Bom dia com Jesus! ☀️";
    const messageTemplate = "Versículo do dia: ";

    const verses = verseService.loadVerses();
    let randomIndex
    let verseAlreadySent
    
    do {
      randomIndex = Math.floor(Math.random() * verses.length)
      verseAlreadySent = await this.verseHistoryRepository.findByVerseId(randomIndex)
    } while (verseAlreadySent)

    const verse = verses[randomIndex]
    
    await this.verseHistoryRepository.create({
      verseId: randomIndex
    })

    const message = `${messageTemplate} ${verse.verse} - ${verse.text}`;
    
    await Promise.all(
      users.map(async (user) => {
        try {
          await this.email.sendEmail(user.email, subject, message);
          console.log(`Email enviado para ${user.email}`);
        } catch (error) {
          console.error(`Erro ao enviar para ${user.email}:`, error);
        }
      })
    );
          
  }
}
