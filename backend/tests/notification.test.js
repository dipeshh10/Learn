require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Notification API Endpoints', () => {
  it('should require authentication for GET /api/notifications', async () => {
    const res = await request(app).get('/api/notifications');
    expect(res.statusCode).toBe(401);
  });
});