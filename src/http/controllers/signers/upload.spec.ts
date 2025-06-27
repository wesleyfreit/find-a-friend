import { app } from '@/app';
import { registerAndAuthenticateOrg } from '@/utils/test/register-and-authenticate-org';
import request from 'supertest';

describe('Mount Upload (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to mount a signed url to upload files', async () => {
    const { token } = await registerAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post('/mount/upload')
      .set('Authorization', `Bearer ${token}`)
      .send({
        filename: 'no_profile.jpg',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ signedUrl: expect.stringContaining('no_profile.jpg') }),
    );
  });
});
