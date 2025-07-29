require('./setupTestEnv');
const request = require('supertest');
const app = require('../index');
 
describe('Attendance API Endpoints', () => {
  it('should require authentication for GET /api/attendance', async () => {
    const res = await request(app).get('/api/attendance');
    expect(res.statusCode).toBe(401);
  });
});