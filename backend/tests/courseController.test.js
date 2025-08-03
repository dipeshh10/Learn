const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../src/controller/courseController');

// Helper to create mock req/res
const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('courseController (fallback, no DB)', () => {
  test('createCourse should create a course and return 201', async () => {
    const code = `TEST_${Date.now()}`;
    const req = {
      databaseConnected: false,
      body: {
        name: 'Calc I',
        code,
        description: 'Test course',
        credits: 3
      }
    };
    const res = createMockRes();

    await createCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    const payload = res.json.mock.calls[0][0];
    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('name', 'Calc I');
    expect(payload).toHaveProperty('code', code);
  });

  test('getAllCourses should return an array', async () => {
    const req = { databaseConnected: false };
    const res = createMockRes();

    await getAllCourses(req, res);

    expect(res.json).toHaveBeenCalled();
    const list = res.json.mock.calls[0][0];
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  test('updateCourse should return 404 if not found (fallback)', async () => {
    const req = { params: { id: 'non-existent-id' }, body: {}, databaseConnected: false };
    const res = createMockRes();

    await updateCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('deleteCourse should return 404 if not found (fallback)', async () => {
    const req = { params: { id: 'non-existent-id' }, databaseConnected: false };
    const res = createMockRes();

    await deleteCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

