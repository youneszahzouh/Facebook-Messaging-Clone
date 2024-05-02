import { faker } from '@faker-js/faker';
import { generateUniqueIntegers } from 'src/nestjs/utils/shuffle-unique-in-array';

export async function seedConversations(prisma) {
  for (let i = 0; i <= 100; i++) {
    const users = generateUniqueIntegers(
      1,
      10,
      faker.number.int({
        min: 2,
        max: 3
      })
    );
    await prisma.conversation.create({
      data: {
        users: {
          create: users.map((userId) => ({ userId }))
        },
        isGroup: users?.length > 2,
        messages: {
          create: {
            type: 'TEXT',
            senderId: users[0],
            content: faker.lorem.sentence(
              faker.number.int({
                min: 5,
                max: 20
              })
            )
          }
        }
      }
    });
  }
}
