require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
const { User } = require('../models'); // Import User model for cleanup

describe('User API Endpoints', () => {
  const testUser = {
    name: 'RouteTest',
    email: 'routetest@example.com',
    password: 'testpass',
    role: 'student',
  };
  let token;

  beforeAll(async () => {
    // Clean up the test user if it exists
    await User.destroy({ where: { email: testUser.email } });
  });

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testUser.email);
    token = res.body.token;
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should get the user profile with valid token', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testUser.email);
  });
}); 