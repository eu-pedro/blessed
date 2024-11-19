import { IEmailService } from "@/application/contracts/email-service";
import nodemailer from 'nodemailer'

export class NodeMailerService implements IEmailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Pedrão" <seuemail@dominio.com>',
      to,
      subject,
      text,
    });
  }


}