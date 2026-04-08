import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
import { injectable } from "tsyringe";

dotenv.config();

export interface EmailOptions {
  to: string;
  subject: string;
  message: string;
}

@injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: Number(process.env.SMPT_PORT),
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_APP_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMPT_MAIL,
      to: options.to,
      subject: options.subject,
      html: options.message,
    });
  }
}
