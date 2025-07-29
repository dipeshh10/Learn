const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Security', () => {
  it('should hash and verify password', async () => {
    const password = 'securepass';
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hash);
    expect(match).toBe(true);
  });

  it('should sign and verify JWT', () => {
    const payload = { id: 1, email: 'test@example.com' };
    const secret = 'testsecret';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const decoded = jwt.verify(token, secret);
    expect(decoded.id).toBe(1);
    expect(decoded.email).toBe('test@example.com');
  });
}); 