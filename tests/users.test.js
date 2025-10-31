function validateUser(user) {
  if (!user.name || !user.email || !user.age) {
    return { valid: false, error: 'Missing required fields' };
  }
  if (user.age < 18) {
    return { valid: false, error: 'User must be 18 years or older' };
  }
  return { valid: true };
}

describe('User Service - User Data Validation', () => {
  test('should validate correct user', () => {
    const user = { name: 'John Doe', email: 'john@example.com', age: 25 };
    const result = validateUser(user);
    expect(result.valid).toBe(true);
  });

  test('should reject user with missing fields', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    const result = validateUser(user);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Missing required fields');
  });

  test('should reject user under 18 years old', () => {
    const user = { name: 'Jane Doe', email: 'jane@example.com', age: 16 };
    const result = validateUser(user);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('User must be 18 years or older');
  });
});
