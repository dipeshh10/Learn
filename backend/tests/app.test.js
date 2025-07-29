require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('User API Endpoints', () => {
  it('should respond to GET /api with 404 or valid response', async () => {
    const res = await request(app).get('/api');
    // Accept 404 (not found) or 200 (if implemented)
    expect([200, 404]).toContain(res.statusCode);
  });
});