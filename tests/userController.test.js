// Testing User controller
// importing usefull resources
const userController = require('../controllers/user.js');
const User = require('../models/user.js');
const {hashPassword} = require('../utils/hash.js');

// Mocking User model and hash
jest.mock('../models/user.js');
jest.mock('../utils/hash.js');

describe('User controller', () => {
    it('Should register a new user successfully', async () => {
        const request = {
            body: {
                username: 'test',
                email: 'test@gmail.com',
                password: 'test123!@#'
            }
        }
        // Mocking res methods
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        hashPassword.mockResolvedValue('hashedPassword');
        User.create = jest.fn().mockResolvedValue({
            ...request.body,
            password: 'hashedPassword'
        });

        await userController.registerUser(request, res);

        expect(hashPassword).toHaveBeenCalledWith(request.body.password);

        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith({
            ...request.body,
            password: 'hashedPassword'
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User created successfuly.',
            user: {newUser: expect.anything()}
        });
    });
});