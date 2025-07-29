require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Learning Material API Endpoints', () => {
  it('should require authentication for GET /api/learning-materials', async () => {
    const res = await request(app).get('/api/learning-materials');
    expect(res.statusCode).toBe(401);
  });
});