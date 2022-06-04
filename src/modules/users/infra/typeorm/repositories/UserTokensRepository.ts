import { getRepository, Repository } from 'typeorm';

// Repositories
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// Entities
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(users_id: string): Promise<UserToken> {
    console.log(users_id);
    const userToken = this.ormRepository.create({
      users_id,
    });

    console.log(userToken);

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
