import { UsersRepository } from "@/application/repository/users-repository";
import { UseCase } from "./usecase";
import { IEmailService } from "../contracts/email-service";
import { VerseRepository } from "../repository/verses/verse-repository";

export class SendDailyEmailUseCase implements UseCase<any, void> {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly email: IEmailService
  ) {}

  async execute(): Promise<void> {
    const users = await this.userRepository.findAll();
    const subject = "Bom dia com Jesus! ☀️";
    const messageTemplate = "Versículo do dia: ";

    const control = VerseRepository.loadControl();
    const verses = VerseRepository.loadVerses();
    const lastIndex = control.lastSentIndex !== undefined ? control.lastSentIndex : -1;
    const nextIndex = (lastIndex + 1) % verses.length;
    const verse = verses[nextIndex];

    const message = `${messageTemplate} ${verse.verse} - ${verse.text}`;
    
    for (const user of users) {
        await this.email.sendEmail(user.email, subject, message);
        console.log(`Email enviado para ${user.email}`);
      }
      
    VerseRepository.saveControl(nextIndex);
    
  }
}
