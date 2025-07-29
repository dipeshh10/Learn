const mockUser = {
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
};
 
jest.mock('../models', () => ({
  User: mockUser,
}));
 
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
 
function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}
 
describe('User Controller', () => {
  afterEach(() => jest.clearAllMocks());
 
  describe('signup', () => {
    it('should create a new user and return token', async () => {
      const req = { body: { name: 'Test', email: 'test@example.com', password: 'pass', role: 'student' } };
      const res = mockResponse();
      mockUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedpass');
      mockUser.create.mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com', role: 'student' });
      jwt.sign.mockReturnValue('token123');
 
      await userController.signup(req, res);
      expect(mockUser.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 10);
      expect(mockUser.create).toHaveBeenCalledWith({ name: 'Test', email: 'test@example.com', password: 'hashedpass', role: 'student' });
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token: 'token123', user: { id: 1, name: 'Test', email: 'test@example.com', role: 'student' } });
    });
 
    it('should return 400 if email exists', async () => {
      const req = { body: { name: 'Test', email: 'test@example.com', password: 'pass', role: 'student' } };
      const res = mockResponse();
      mockUser.findOne.mockResolvedValue({ id: 1 });
 
      await userController.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email already exists' });
    });
  });
 
  describe('login', () => {
    it('should login user and return token', async () => {
      const req = { body: { email: 'test@example.com', password: 'pass' } };
      const res = mockResponse();
      mockUser.findOne.mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com', password: 'hashedpass', role: 'student' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token123');
 
      await userController.login(req, res);
      expect(mockUser.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('pass', 'hashedpass');
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token: 'token123', user: { id: 1, name: 'Test', email: 'test@example.com', role: 'student' } });
    });
 
    it('should return 400 if user not found', async () => {
      const req = { body: { email: 'notfound@example.com', password: 'pass' } };
      const res = mockResponse();
      mockUser.findOne.mockResolvedValue(null);
 
      await userController.login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
 
    it('should return 400 if password does not match', async () => {
      const req = { body: { email: 'test@example.com', password: 'wrong' } };
      const res = mockResponse();
      mockUser.findOne.mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com', password: 'hashedpass', role: 'student' });
      bcrypt.compare.mockResolvedValue(false);
 
      await userController.login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });
 
  describe('profile', () => {
    it('should return user profile without password', async () => {
      const req = { user: { id: 1 } };
      const res = mockResponse();
      mockUser.findByPk.mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com', role: 'student' });
 
      await userController.profile(req, res);
      expect(mockUser.findByPk).toHaveBeenCalledWith(1, { attributes: { exclude: ['password'] } });
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test', email: 'test@example.com', role: 'student' });
    });
  });
});