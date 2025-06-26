import { app } from '@/app';
import { registerAndAuthenticateOrg } from '@/utils/test/register-and-authenticate-org';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get the organization profile', async () => {
    const { token, organization } = await registerAndAuthenticateOrg(app);

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        organization: expect.objectContaining({
          email: organization.email,
        }),
      }),
    );
  });
});
