import { container } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

import IUserTokensRepository from '../repositories/IUserTokensRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
