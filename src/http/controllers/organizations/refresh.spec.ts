import { app } from '@/app';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('Refresh Token Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh the auth token', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await request(app.server)
      .post('/organizations')
      .send({
        principal: faker.company.name(),
        email,
        password,
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode({ format: '#####-###' }),
        city: faker.location.city(),
        state: faker.location.state(),
        phone: faker.phone.number(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      });

    const authResponse = await request(app.server).post('/sessions').send({
      email,
      password,
    });

    const cookies = authResponse.get('Set-Cookie') ?? [];

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
