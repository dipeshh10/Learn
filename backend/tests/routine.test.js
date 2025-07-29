require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Routine API Endpoints', () => {
  it('should require authentication for GET /api/routines', async () => {
    const res = await request(app).get('/api/routines');
    expect(res.statusCode).toBe(401);
  });
});