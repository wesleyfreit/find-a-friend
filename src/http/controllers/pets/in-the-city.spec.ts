import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { registerAndAuthenticateOrg } from '@/utils/test/register-and-authenticate-org';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('In The City Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get all of the pets in the city', async () => {
    const { token, organization } = await registerAndAuthenticateOrg(app, {
      city: 'Cajazeiras',
      state: 'PB',
      cep: '58900-000',
    });
    const { organization: org2 } = await registerAndAuthenticateOrg(app);

    await prisma.pet.createMany({
      data: [
        {
          name: 'Dog',
          about: 'A friendly dog',
          age: 'YOUNG',
          energy: 'HIGH',
          ambient: 'OUTDOOR',
          size: 'SMALL',
          independency: 'LOW',
          orgId: organization.id,
        },
        {
          name: 'Cat',
          about: 'A friendly cat',
          age: 'SENIOR',
          energy: 'MEDIUM',
          ambient: 'BOTH',
          size: 'SMALL',
          independency: 'LOW',
          orgId: organization.id,
        },
        {
          name: 'Rabbit',
          about: 'A friendly rabbit',
          age: 'PUPPY',
          energy: 'HIGH',
          ambient: 'OUTDOOR',
          size: 'SMALL',
          independency: 'LOW',
          orgId: organization.id,
        },
        {
          name: 'Dog2',
          about: 'A friendly dog',
          age: 'SENIOR',
          energy: 'HIGH',
          ambient: 'OUTDOOR',
          size: 'EXTRA_LARGE',
          independency: 'MEDIUM',
          orgId: org2.id,
        },
      ],
    });

    const response = await request(app.server)
      .get(
        `/pets/search?city=Cajazeiras&uf=PB&energy=HIGH&ambient=OUTDOOR&size=SMALL&independency=LOW`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        pets: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: 'Dog',
          }),
          expect.objectContaining({
            id: expect.any(String),
            name: 'Rabbit',
          }),
        ]),
      }),
    );
  });
});
