// Mock pg pool and bcrypt/jwt
jest.mock('../src/database/db', () => ({
  query: jest.fn()
}));
jest.mock('bcryptjs', () => ({ compare: jest.fn() }));
jest.mock('jsonwebtoken', () => ({ sign: jest.fn(() => 'test-token') }));

const pool = require('../src/database/db');
const bcrypt = require('bcryptjs');
const { login } = require('../src/controller/loginController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('loginController', () => {
  test('returns 400 when missing email or password', async () => {
    const res = createMockRes();
    await login({ body: { email: '' } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('returns 401 when user not found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const req = { body: { email: 'x@test.com', password: 'p' } };
    const res = createMockRes();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('returns 401 when password invalid', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'x@test.com', password: 'hash', role: 'admin' }] });
    bcrypt.compare.mockResolvedValueOnce(false);
    const req = { body: { email: 'x@test.com', password: 'p' } };
    const res = createMockRes();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

