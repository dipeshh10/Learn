require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Student API Endpoints', () => {
  it('should require authentication for GET /api/students', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(401); // Should be unauthorized
  });
});