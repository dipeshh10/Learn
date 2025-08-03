jest.mock('../src/database/db', () => ({
  query: jest.fn()
}));
jest.mock('bcryptjs', () => ({ hash: jest.fn(() => 'hashed') }));

const pool = require('../src/database/db');
const { signup } = require('../src/controller/signupController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('signupController', () => {
  test('returns 400 when required fields missing', async () => {
    const req = { body: {} };
    const res = createMockRes();
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('returns 409 if user exists', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'x@test.com' }] });
    const req = { body: { username: 'u', email: 'x@test.com', password: 'p', role: 'admin' } };
    const res = createMockRes();
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
  });
});

