/* eslint-disable func-names */
import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import AppError from '@shared/errors/AppError';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SMTPMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const { host, auth, port, secure } = mailConfig.defaults;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    try {
      this.client.sendMail({
        from: {
          name: from?.name || 'Equipe Soft',
          address: from?.email || 'rodrigo@eadconcept.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (err: any) {
      throw new AppError(err.message);
    }
  }
}
