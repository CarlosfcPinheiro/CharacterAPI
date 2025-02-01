// Importing packages
const sum = require('../utils/sum.js');
// const request = require('supertest');
// const server = require('../server.js');

// describe('Testing API User model', () => {
//     test('GET /user may return users list with status 200 OK', async() => {
//         const response = await request(server).get('/user');

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });
// });

test('Sum 2 + 3 may result in 5', () => {
    expect(sum(2, 3)).toBe(5);
});