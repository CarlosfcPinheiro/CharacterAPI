// Importing packages
const sum = require('../utils/sum.js');
// tests packages
const {describe, it, expect, beforeAll, afterAll} = require('@jest/globals');
const request = require('supertest');
const server = require('../server.js');
// DB resources
const connectionTestSyncDB = require('../db/connectionTestSyncDB.js');
const { sequelize } = require('../db/db.js');

test('Sum 2 + 3 may result in 5', () => {
    expect(sum(2, 3)).toBe(5);
});

beforeAll(async () => {
    await connectionTestSyncDB();
});

afterAll(async () => {
    await sequelize.close();
});

describe('Testing /user requests', () => {
    it('May response users array with correct attributes', async () => {
        const res = await request(server).get('/api/v1/user');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.users)).toBe(true);
        expect(res.body.users.length).toBeGreaterThan(0);
    });
});