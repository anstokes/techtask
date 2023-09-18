import { credentials, expect, server } from '../../setup';

describe('Given that we GET the root of the API endpoint, without credentials', async () => {
  it('should return a forbidden error (403) response containing a { error: \'Invalid credentials provided\' } JSON payload', async () => {
    const res = await server.get('/');

    // Check status
    expect(res.status).to.equal(403);

    // Check JSON response
    expect(res.body).to.deep.equal({ error: 'Invalid credentials provided' });
  });
});

describe('Given that we GET the root of the API endpoint, with INVALID credentials', async () => {
  it('should return a forbidden error (403) response containing a { error: \'Invalid credentials provided\' } JSON payload', async () => {
    const res = await server.get('/')
      .set('authorization', `INVALID:${credentials}:INVALID`);

    // Check status
    expect(res.status).to.equal(403);

    // Check JSON response
    expect(res.body).to.deep.equal({ error: 'Invalid credentials provided' });
  });
});

describe('Given that we GET the root of the API endpoint, with VALID credentials', async () => {
  it('should return a successful (200) response containing a { status: \'OK\' } JSON payload', async () => {
    const res = await server.get('/')
      .set('authorization', credentials);

    // Check status
    expect(res.status).to.equal(200);

    // Check JSON response
    expect(res.body).to.deep.equal({ status: 'OK' });
  });
});
