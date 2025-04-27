// Unit hash functions tests
const {hashPassword, verifyPassword} = require('../src/utils/hash.js');
// Test suite
describe('Hash password functions', () => {
    const testpassword = 'test123!@#';
    it('should return a hashedpassword', async () => {
        const result = await hashPassword(testpassword);
        expect(result).toHaveLength(60);
        expect(typeof result).toBe('string')
    });
    it('should return a boolean value to compare hashed and true password', async () => {
        const hashedpassword = await hashPassword(testpassword);
        const result = await verifyPassword(testpassword, hashedpassword);
        expect(result).toBe(true);
        expect(typeof result).toBe('boolean');
    });
});