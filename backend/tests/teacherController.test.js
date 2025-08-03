const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} = require('../src/controller/teacherController');

// Helper to create mock req/res
const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('teacherController (fallback, no DB)', () => {
  test('createTeacher should create a teacher and return 201', async () => {
    const req = {
      databaseConnected: false,
      body: {
        name: 'Test Teacher',
        email: `teacher_${Date.now()}@school.com`,
        subject: 'Mathematics',
        phone: '123-456-7890',
        department: 'Science'
      }
    };
    const res = createMockRes();

    await createTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    const payload = res.json.mock.calls[0][0];
    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('name', 'Test Teacher');
    expect(payload).toHaveProperty('email');
    expect(payload).toHaveProperty('subject', 'Mathematics');
  });

  test('getAllTeachers should return an array', async () => {
    const req = { databaseConnected: false };
    const res = createMockRes();

    await getAllTeachers(req, res);

    expect(res.json).toHaveBeenCalled();
    const list = res.json.mock.calls[0][0];
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  test('updateTeacher should return 404 if not found (fallback)', async () => {
    const req = { params: { id: 'non-existent-id' }, body: {}, databaseConnected: false };
    const res = createMockRes();

    await updateTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('deleteTeacher should return 404 if not found (fallback)', async () => {
    const req = { params: { id: 'non-existent-id' }, databaseConnected: false };
    const res = createMockRes();

    await deleteTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

