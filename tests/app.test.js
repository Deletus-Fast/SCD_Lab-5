const request = require('supertest');
const app = require('../app');

describe('Project API', () => {
    it('should create a new project', async () => {
        const response = await request(app)
            .post('/projects')
            .send({
                id: 1,
                name: 'Test Project',
                description: 'Test description',
                completionTime: '2024-12-31',
                createdBy: '1', 
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Project created successfully!');
    });
});
