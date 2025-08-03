const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../src/controller/user/studentController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('studentController (fallback, no DB)', () => {
  test('createStudent should create a student and return 201', async () => {
    const req = {
      databaseConnected: false,
      body: {
        name: 'Test Student',
        email: `student_${Date.now()}@school.com`,
        course: 'CS'
      }
    };
    const res = createMockRes();

    await createStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    const payload = res.json.mock.calls[0][0];
    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('name', 'Test Student');
  });

  test('getAllStudents returns array', async () => {
    const req = { databaseConnected: false };
    const res = createMockRes();
    await getAllStudents(req, res);
    const list = res.json.mock.calls[0][0];
    expect(Array.isArray(list)).toBe(true);
  });

  test('getStudentById returns 404 for missing', async () => {
    const req = { params: { id: 'missing' }, databaseConnected: false };
    const res = createMockRes();
    await getStudentById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

