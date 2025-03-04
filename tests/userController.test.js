// Testing User controller
// importing usefull resources
const userController = require('../controllers/user.js');
const User = require('../models/user.js');
const {hashPassword} = require('../utils/hash.js');

// Mocking User model and hash
jest.mock('../models/user.js');
jest.mock('../utils/hash.js');

describe('User controller', () => {
    // Mocking res methods
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    it('Should register a new user successfully', async () => {
        const req = {
            body: {
                username: 'test',
                email: 'test@gmail.com',
                password: 'test123!@#'
            }
        }
        hashPassword.mockResolvedValue('hashedPassword');
        User.create = jest.fn().mockResolvedValue({
            ...req.body,
            password: 'hashedPassword'
        });

        await userController.registerUser(req, res);

        expect(hashPassword).toHaveBeenCalledWith(req.body.password);

        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith({
            ...req.body,
            password: 'hashedPassword'
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User created successfuly.',
            created_user: {newUser: expect.anything()}
        });
    });

    it('Should get all users successfully', async () => {
        const req = { query:{} };
        const mockUsers = [
            {
                id: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7",
                username: "root",
                email: "root@gmail.com",
                password: "$2a$05$6G8VT.XP4TEh1fxPmbbNXehQuwFX.Io7YwAQnW3JlArER2G3Ze3OG",
                char_count: 0,
                created_at: "2025-02-23T21:26:57.988Z" 
            }
        ];
        User.findAll = jest.fn().mockResolvedValue(mockUsers);

        await userController.getAllUsers(req, res);

        expect(User.findAll).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            users: mockUsers,
            entities_count: mockUsers.length
        });
    });

    it('Should delete an user by id successfully', async () => {
        const mockUser = {
            destroy: jest.fn(),
            id: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7"
        }
        const req = { 
            params:{ id : mockUser.id },
            user: { id: mockUser.id }
        }
        User.findByPk = jest.fn().mockResolvedValue(mockUser);

        await userController.deleteUser(req, res);
        
        expect(User.findByPk).toHaveBeenCalledTimes(1);
        expect(User.findByPk).toHaveBeenCalledWith(req.params.id);

        expect(mockUser.destroy).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User deleted successfully.'
        });
    });

    it('Should change user credentials by id successfully', async () => {
        const req = {
            params: { id:'505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7' },
            body: { username: 'newUser', email: 'newUser@gmail.com' },
            user: { id:'505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7' }
        }
        const mockUser = {
            id: req.params.id,
            username: req.body.username,
            email: req.body.email
        }
        User.update = jest.fn().mockResolvedValue([1, 1]);
        User.findByPk = jest.fn().mockResolvedValue(mockUser);

        await userController.changeCredentialsUser(req, res);

        expect(User.update).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledWith(req.body, {
            where: {id:req.params.id}
        });

        expect(User.findByPk).toHaveBeenCalledTimes(1);
        expect(User.findByPk).toHaveBeenCalledWith(req.params.id);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User has been updated successfully.',
            user: mockUser
        });
    });

    it('Should get a single user by id successfully', async () => {
        const req = { params: { id:'505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7' }};
        const mockUser = {
            id: req.params.id,
            username: "root",
            email: "root@gmail.com",
            password: "$2a$05$6G8VT.XP4TEh1fxPmbbNXehQuwFX.Io7YwAQnW3JlArER2G3Ze3OG",
            char_count: 0,
            created_at: "2025-02-23T21:26:57.988Z"
        }
        User.findByPk = jest.fn().mockResolvedValue(mockUser);

        await userController.getSingleUserById(req, res);

        expect(User.findByPk).toHaveBeenCalledTimes(1);
        expect(User.findByPk).toHaveBeenCalledWith(req.params.id);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            user: mockUser
        });
    });
});