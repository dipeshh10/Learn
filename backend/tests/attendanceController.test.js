jest.mock('../src/models', () => ({
  Attendance: { findAll: jest.fn().mockResolvedValue([]) },
  Student: {},
  User: {}
}));

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} = require('../src/controller/attendanceController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('attendanceController (unit smoke)', () => {
  test('getAllAttendance returns array (DB may be empty)', async () => {
    const req = {};
    const res = createMockRes();
    await getAllAttendance(req, res);
    expect(res.json).toHaveBeenCalled();
    const data = res.json.mock.calls[0][0];
    expect(Array.isArray(data)).toBe(true);
  });
});

