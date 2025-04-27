// Testing char controller
// importing usefull resources
const charController = require('../src/controllers/char.js');
const Char = require('../src/models/char.js');

// Mocking Char model
jest.mock('../src/models/char.js');
jest.mock('../src/models/user.js');

describe('Char controller', () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    it('Should get all chars successfully', async () => {
        const req = { query:{} };
        const mockChars = [
            {
                id: "9441536d-c7f6-4e30-82f3-629d44f2c117",
                userid: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7",
                charname: "rootchar",
                face_type: "Sad",
                head_type: "Triangle",
                accessory_type: "Glasses",
                item_type: "Cane",
                created_at: "2025-02-14T20:07:15.174Z",
                user_creator: {
                    username: "root"
                }
            }
        ];
        Char.findAll = jest.fn().mockResolvedValue(mockChars);

        await charController.getAllChars(req, res);

        expect(Char.findAll).toHaveBeenCalledTimes(1);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            chars: mockChars
        });
    });

    it('Should get all chars by userId successfully', async () => {
        const req = { 
            params: { userId: '505b22a9-2ca6-4f8f-9728-ce2ce5c44fd' },
            query: {}
        };
        const mockChars = [
            {
                id: req.params.id,
                userid: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7",
                charname: "rootchar",
                face_type: "Sad",
                head_type: "Triangle",
                accessory_type: "Glasses",
                item_type: "Cane",
                created_at: "2025-02-14T20:07:15.174Z",
                user_creator: {
                    username: "root"
                }
            },
            {
                id: "47fea25d-3b12-4185-8c88-c743af06f7a5",
                userid: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7",
                charname: "update",
                face_type: "Sad",
                head_type: "Square",
                accessory_type: "Glasses",
                item_type: "Paper",
                created_at: "2025-02-15T20:10:05.814Z"
            }
        ]
        Char.findAll = jest.fn().mockResolvedValue(mockChars);

        await charController.getCharsByUserId(req, res);

        expect(Char.findAll).toHaveBeenCalledTimes(1);
        expect(Char.findAll).toHaveBeenCalledWith({
            where: { userid:req.params.userId },
            order: [["charname", "ASC"]],
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            chars: mockChars,
            entities_count: mockChars.length
        });
    });

    it('Should get a single char by id successfully', async () => {
        const req = { params: {id:'505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7'} };
        const mockChar = {
            id: req.params.id,
            userid: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7",
            charname: "rootchar",
            face_type: "Sad",
            head_type: "Triangle",
            accessory_type: "Glasses",
            item_type: "Cane",
            created_at: "2025-02-14T20:07:15.174Z",
            user_creator: {
                username: "root"
            }
        }
        Char.findByPk = jest.fn().mockResolvedValue(mockChar);

        await charController.getSingleCharById(req, res);

        expect(Char.findByPk).toHaveBeenCalledTimes(1);
        expect(Char.findByPk).toHaveBeenCalledWith(req.params.id);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            char: mockChar
        });
    });
});
