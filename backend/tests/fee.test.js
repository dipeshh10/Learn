require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Fee API Endpoints', () => {
  it('should require authentication for GET /api/fees', async () => {
    const res = await request(app).get('/api/fees');
    expect(res.statusCode).toBe(401);
  });
});