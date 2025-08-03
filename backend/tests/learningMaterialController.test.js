jest.mock('../src/models', () => ({
  LearningMaterial: { findAll: jest.fn().mockResolvedValue([]) },
  User: {}
}));

const {
  getAllLearningMaterials
} = require('../src/controller/learningMaterialController');

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('learningMaterialController (unit smoke)', () => {
  test('getAllLearningMaterials returns array (DB may be empty)', async () => {
    const req = {};
    const res = createMockRes();
    await getAllLearningMaterials(req, res);
    const data = res.json.mock.calls[0][0];
    expect(Array.isArray(data)).toBe(true);
  });
});

