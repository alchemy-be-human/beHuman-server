const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');

describe('. routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('allows a the main Admin to login via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'behumannotbot@gmail.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'behumannotbot@gmail.com',
    });
  });

  it('verifies a user is logged in', async() => {
    const agent = request.agent(app);
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'adminPassword' 
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'adminPassword' 
      });

    const res = await agent
      .get('/api/v1/auth/verify');
    
    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com', 
    });
  });

  it('update admin password by email via put route', async() => {
    const agent = request.agent(app);
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'adminPassword'
    });
    
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'adminPassword'
      });

    const res = await agent
      .put('/api/v1/auth/updatePassword')
      .send({
        password: 'newPassword'
      });
    
    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com'
    });
  });

});
