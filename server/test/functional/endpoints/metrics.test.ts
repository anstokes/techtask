import { credentials, expect, server } from '../../setup';

describe('Given that we GET the \'/metrics\' API endpoint', async () => {
  it('should return a successful response containing a Prometheus compatible metrics output', async () => {
    const res = await server.get('/metrics')
      .set('authorization', credentials)
      // Disable automatic JSON parsing
      .buffer(true)
      .parse((response: any, cb: Function) => {
        let data = Buffer.from('');
        response.on('data', (chunk: Uint8Array) => {
          data = Buffer.concat([data, chunk]);
        });
        response.on('end', () => {
          cb(null, data.toString());
        });
      });

    // Check status
    expect(res.status).to.equal(200);

    // Check response
    expect(res.body).to.match(/^# HELP/);
  });
});
