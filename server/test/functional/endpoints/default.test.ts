import { credentials, expect, server } from '../../setup';

describe('Given that we GET the root of the API endpoint', async () => {
  it('should return a successful response containing a { status: \'OK\' } JSON payload', async () => {
    const res = await server.get('/')
      .set('authorization', credentials);

    // Check status
    expect(res.status).to.equal(200);

    // Check JSON response
    expect(res.body).to.deep.equal({ status: 'OK' });
  });
});
