const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('tests for Tip endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));

  afterAll(() => pool.end());

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

  it('GET: retrieve all tips', async() => {
    await request(app)
      .post('/api/v1/tips')
      .send({
        tip: 'Drink water.'
      });

    await request(app)
      .post('/api/v1/tips')
      .send({
        tip: 'Take 5 deep breaths.'
      });

    await request(app)
      .post('/api/v1/tips')
      .send({
        tip: 'Look out a window.'
      });

    const res = await request(app)
      .get('/api/v1/tips');

    const results = [
      { id: expect.any(String), tip: 'Drink water.' },
      { id: expect.any(String), tip: 'Take 5 deep breaths.' },
      { id: expect.any(String), tip: 'Look out a window.' }
    ];

    expect(res.body).toEqual(results);
    expect(res.body.length).toEqual(results.length);
    results.forEach(result => expect(res.body).toContainEqual(result));
  });



});
