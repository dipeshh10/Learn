const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

const UserMock = DBConnectionMock.define('User', {
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashedpass',
  role: 'student',
});

describe('User Model', () => {
  it('should create a user', async () => {
    const user = await UserMock.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpass',
      role: 'student',
    });
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('hashedpass');
    expect(user.role).toBe('student');
  });
}); 