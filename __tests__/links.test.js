const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('Link endpoint', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });
  afterAll(() => {
    return pool.end();
  });

  it('creates a new link via POST', async() => {
    const res = await request(app)
      .post('/links')
      .send({
        url: 'http://www.youtube.com'
      });

    expect(res.body).toEqual({
      id: '1',
      url: 'http://www.youtube.com'
    });
  });
});
