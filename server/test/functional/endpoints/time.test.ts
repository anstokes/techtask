import { credentials, expect, server } from '../../setup';

const epochSeconds = Math.round(new Date().getTime() / 1000);

describe('Given that we GET the \'/time\' API endpoint', async () => {
  it(`should return a successful response containing an epoch time (in seconds) JSON payload; e.g. { epoch: ${epochSeconds} }`, async () => {
    const res = await server.get('/time')
      .set('authorization', credentials);

    // Check status
    expect(res.status).to.equal(200);

    // Check JSON response
    expect(res.body.epoch).to.be.a('number');
  });
});
