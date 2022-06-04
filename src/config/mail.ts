import 'dotenv/config';

interface IMailConfig {
  driver: 'smtp';

  defaults: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'smtp',

  defaults: {
    host: process.env.MAIL_HOST || 'host',
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'false' ? false : true || false,
    auth: {
      user: process.env.MAIL_USER || 'user',
      pass: process.env.MAIL_PASS || 'pass',
    },
  },
} as IMailConfig;
