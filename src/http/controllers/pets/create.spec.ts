import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { registerAndAuthenticateOrg } from '@/utils/test/register-and-authenticate-org';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a pet in an org', async () => {
    const { token, organization } = await registerAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Dog',
        about: 'A friendly dog',
        age: 'YOUNG',
        energy: 'HIGH',
        ambient: 'OUTDOOR',
        size: 'SMALL',
        independency: 'LOW',
        requirements: ['vaccination', 'neutering'],
        medias: ['media1.jpg', 'media2.jpg'],
        orgId: organization.id,
      });

    expect(response.status).toBe(201);

    const petOnDatabase = await prisma.pet.findFirst({
      where: {
        name: 'Dog',
        orgId: organization.id,
        about: 'A friendly dog',
        age: 'YOUNG',
        energy: 'HIGH',
        ambient: 'OUTDOOR',
        size: 'SMALL',
        independency: 'LOW',
        requirements: {
          some: { OR: [{ name: 'vaccination' }, { name: 'neutering' }] },
        },
      },
    });

    expect(petOnDatabase).toBeTruthy();
  });
});
