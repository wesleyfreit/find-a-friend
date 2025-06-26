import { app } from '@/app';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register an organization', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send({
        principal: faker.company.name(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode({ format: '#####-###' }),
        city: faker.location.city(),
        state: faker.location.state(),
        phone: faker.phone.number(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      });

    expect(response.status).toBe(201);
  });
});
