const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('Link endpoint', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/test.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('creates a new link via POST', async() => {
    const res = await request(app)
      .post('/api/v1/links')
      .send({
        url: 'http://www.youtube.com'
      });
      
    expect(res.body).toEqual({
      id: `${res.body.id}`,
      url: 'http://www.youtube.com'
    });
  });

  it('finds a link by id via GET', async() => {
    const res = await request(app)
      .get('/api/v1/links/2');

    expect(res.body).toEqual({
      id: '2',
      url: 'https://www.youtube.com/watch?v=Re-h_rtttIE'
    });
  });

  it('returns all links via GET', async() => {
    const res = await request(app)
      .get('/api/v1/links');
    expect(res.body).toHaveLength(3);
    expect(res.body).toEqual([
      { 'id':'1', 'url':'https://www.youtube.com/watch?v=wnlcuZ0mJSU' }, 
      { 'id':'2', 'url':'https://www.youtube.com/watch?v=Re-h_rtttIE' }, 
      { 'id':'3', 'url':'https://www.youtube.com/watch?v=SuScgzVJp-s' }]);
  });

  it('delets a link via DELETE', async() => {
    const res = await request(app)
      .delete('/api/v1/links/2');
    expect(res.body).toEqual(
      { 'id':'2', 'url':'https://www.youtube.com/watch?v=Re-h_rtttIE' }
    );
  });

  it('returns a random link via GET', async() => {
    const res = await request(app)
      .get('/api/v1/links/random');

    expect(res.body).toEqual({
      'id':expect.any(String), 'url':expect.any(String) }
    );
  });

});
