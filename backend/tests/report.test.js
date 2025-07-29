require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Report API Endpoints', () => {
  it('should require authentication for GET /api/reports', async () => {
    const res = await request(app).get('/api/reports');
    expect(res.statusCode).toBe(401);
  });
});