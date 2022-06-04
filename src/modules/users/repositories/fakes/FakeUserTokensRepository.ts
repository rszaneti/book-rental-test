import { v4 as uuidv4 } from 'uuid';

// Repositories
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// Entities
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private user_tokens: UserToken[] = [];

  public async generate(users_id: string): Promise<UserToken> {
    const createReg = new UserToken();

    Object.assign(createReg, {
      id: uuidv4(),
      users_id,
      token: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.user_tokens.push(createReg);

    return createReg;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.user_tokens.find(r => r.token === token);

    return userToken;
  }
}

export default FakeUserTokensRepository;
