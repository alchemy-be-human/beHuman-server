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

    expect(res.body).toEqual(
      { id: expect.any(String), tip: 'Drink water.' }
    );
  });

  it('returns all tips via GET', async() => {

    const tips = await Promise.all([
      {
        tip: 'Drink water.'
      },
      {
        tip: 'Take 5 deep breaths.'
      },
      {
        tip: 'Look out a window.'
      }
    ].map(tip => Tip.insert(tip)));

    const res = await request(app)
      .get('/api/v1/tips');

    const results = [
      { id: expect.any(String), tip: 'Drink water.' },
      { id: expect.any(String), tip: 'Take 5 deep breaths.' },
      { id: expect.any(String), tip: 'Look out a window.' }
    ];

    expect(res.body.length).toEqual(results.length);
    results.forEach(result => expect(res.body).toContainEqual(result));
  });

  it('udpates a tip via PUT', async() => {
    const tip = await Tip.insert(
      { tip: 'Walk around the room.' }
    );

    const res = await request(app)
      .put(`/api/v1/tips/${tip.id}`)
      .send(
        { tip: 'Walk around the block.' }
      );

    expect(res.body).toEqual(
      { id: tip.id, tip: 'Walk around the block.' }
    );
  });

  it('deletes a tip via DELETE', async() => {
    const tip = await Tip.insert(
      { tip: 'Walk around the room.' }
    );

    const res = await request(app)
      .delete(`/api/v1/tips/${tip.id}`);

    expect(res.body).toEqual(tip);
  });

  it('returns a random tip via GET', async() => {
    const tips = await Promise.all([
      {
        tip: 'Drink water.'
      },
      {
        tip: 'Take 5 deep breaths.'
      },
      {
        tip: 'Look out a window.'
      }
    ].map(tip => Tip.insert(tip)));
    
    const res = await request(app)
      .get('/api/v1/tips/random');

    expect(res.body).toEqual({
      'id':expect.any(String), 'tip':expect.any(String) }
    );
  });
});
