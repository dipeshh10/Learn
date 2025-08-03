// For notificationController, it uses a real pg Pool. We'll mock its query layer.
jest.mock('../src/database/db', () => ({
  query: jest.fn().mockResolvedValue({ rows: [] })
}));

const { getAllNotifications } = require('../src/controller/notificationController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('notificationController (unit smoke)', () => {
  test('getAllNotifications returns array (DB may be empty)', async () => {
    const req = {};
    const res = createMockRes();
    await getAllNotifications(req, res);
    const data = res.json.mock.calls[0][0];
    expect(Array.isArray(data)).toBe(true);
  });
});

