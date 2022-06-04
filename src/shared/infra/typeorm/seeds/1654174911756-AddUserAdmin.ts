import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';

// Entities
import User from '../../../../modules/users/infra/typeorm/entities/User';

export default class AddUserAdmin1654174911756 implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const passwordHash = await hash('admin', 8);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: '42762011-4a37-4b37-bad8-12d19fa947ea',
          username: 'admin',
          name: 'Administrador',
          email: 'email@email.com',
          password: passwordHash,
        },
      ])
      .execute();
  }
}
