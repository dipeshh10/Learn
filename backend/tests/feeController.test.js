jest.mock('../src/models', () => ({
  Fee: { findAll: jest.fn().mockResolvedValue([]) },
  Student: {}
}));

const {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee
} = require('../src/controller/feeController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('feeController (unit smoke)', () => {
  test('getAllFees returns array (DB may be empty)', async () => {
    const req = {};
    const res = createMockRes();
    await getAllFees(req, res);
    const data = res.json.mock.calls[0][0];
    expect(Array.isArray(data)).toBe(true);
  });
});

