const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('. routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it ('it seeds an Admin account via POST', () => {
    //email, password
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'admin@beHuman.com', password:'password' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'admin@beHuman.com',
        });
      });
  });






});