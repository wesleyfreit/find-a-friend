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
    const { token, organization } = await registerAndAuthenticateOrg(app, {
      principal: 'John Doe',
      phone: '+55 83 99999-9999',
    });

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
      },
    });

    const response = await request(app.server)
      .get(`/pets/adoption/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        organizationPrincipal: expect.stringContaining('John Doe'),
        whatsappNumber: expect.stringContaining('+55 83 99999-9999'),
      }),
    );
  });
});
