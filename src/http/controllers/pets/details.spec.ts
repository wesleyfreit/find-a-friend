import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { registerAndAuthenticateOrg } from '@/utils/test/register-and-authenticate-org';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Details Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get all of the pet details', async () => {
    const { token, organization } = await registerAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: {
        name: 'Dog',
        about: 'A friendly dog',
        age: 'YOUNG',
        energy: 'HIGH',
        ambient: 'OUTDOOR',
        size: 'SMALL',
        independency: 'LOW',
        orgId: organization.id,
        requirements: {
          create: [{ name: 'vaccination' }, { name: 'neutering' }],
        },
        medias: {
          create: [{ path: 'media1.jpg' }, { path: 'media2.jpg' }],
        },
      },
    });

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          id: pet.id,
          name: 'Dog',
          about: 'A friendly dog',
          age: 'YOUNG',
          energy: 'HIGH',
          ambient: 'OUTDOOR',
          size: 'SMALL',
          independency: 'LOW',
          requirements: expect.arrayContaining([
            expect.objectContaining({ name: 'vaccination' }),
            expect.objectContaining({ name: 'neutering' }),
          ]),
          medias: expect.arrayContaining([
            expect.objectContaining({ path: 'https://example.com/media1.jpg' }),
            expect.objectContaining({ path: 'https://example.com/media2.jpg' }),
          ]),
        }),
      }),
    );
  });
});
