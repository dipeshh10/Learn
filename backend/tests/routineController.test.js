jest.mock('../src/models', () => ({
  Routine: { findAll: jest.fn().mockResolvedValue([]) }
}));

const {
  getAllRoutines
} = require('../src/controller/routineControllerNEW');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('routineController (unit smoke)', () => {
  test('getAllRoutines returns array (DB may be empty)', async () => {
    const req = {};
    const res = createMockRes();
    await getAllRoutines(req, res);
    const data = res.json.mock.calls[0][0];
    expect(Array.isArray(data)).toBe(true);
  });
});

