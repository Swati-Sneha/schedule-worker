process.env.NODE_ENV = 'test';

let server = require('../server');
const supertest = require('supertest');
const request = supertest(server);



describe('Schedules', () => {
      it('it should GET schedules for the user in time range -- should return 403 error for incorrect access token', async() => {
        let response = await request
            .get('/scheduler/schedule')
            .set('authorization', `Bearer abc`)
            .send()

        expect(response.status).toBe(403);
        console.log(response)
        expect(JSON.parse(response.text).code).toBe('INVALID_AUTHORIZATION');
      });
});