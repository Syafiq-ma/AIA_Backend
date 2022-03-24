const app = require('../../app')
const request = require('supertest');
const { text } = require('body-parser');

describe('get data', () => {
    it('return status code 200', async () => {
        await request(app).get('/api/data')
        .expect(200)
        .expect("Content-Type", /json/);
    })
})

describe('get search data', () => {
    it('return search data', async () => {
        await request(app)
            .post('/api/search').send({text:'mountain'})
            .expect(200)
            .expect("Content-Type", /json/);
    })
})