const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('tests for Tip endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));

  afterAll(() => pool.end());


  it('test description', () => {
    expect(true).toEqual(true);
  });

  it('POST: create a new tip', async() => {
    const res = await request(app)
      .post('/api/v1/tips')
      .send({
        tip: 'Drink water.'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      tip: 'Drink water.'
    });
  });



});
