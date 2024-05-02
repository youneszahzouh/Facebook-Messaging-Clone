import { faker } from '@faker-js/faker';
import { hashPassword } from 'src/nestjs/utils/hashPassword';

export async function seedUsers(prisma) {
  await prisma.user.upsert({
    where: { email: 'younes@gmail.com' },
    update: {},
    create: {
      email: 'younes@gmail.com',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: await hashPassword('12345678aA@')
    }
  });

  for (let i = 0; i <= 10; i++) {
    const email = faker.internet.email();
    await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: await hashPassword('12345678aA@')
      }
    });
  }
}
