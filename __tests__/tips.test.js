const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Tip = require('../lib/models/Tip');
const pool = require('../lib/utils/pool');

describe('tests for Tip endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));

  afterAll(() => pool.end());

  it('creates a new tip via POST', async() => {
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

  it('returns all tips via GET', async() => {
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

  it('udpates a tip via PUT', async() => {
    const tip = await Tip.insert(
      { id: expect.any(String), tip: 'Walk around the room.'}
    );

    const res = await request(app)
      .put(`/api/v1/tips/${tip.id}`)
      .send(
        { id: tip.id, tip: 'Walk around the block.' });


      console.log('**********************************');
      console.log(res.body);

    expect(res.body).toEqual(
      { id: tip.id, tip: 'Walk around the block.' }
    );
  });



});
