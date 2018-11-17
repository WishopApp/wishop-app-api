const supertest = require('supertest')

const app = require('../api/server')

describe('App', () => {

  describe('GET /graphiql', () => {
    it('it should response 200 status code', (done) => {
      supertest(app)
        .get('/graphiql')
        .expect(200, done)
    })
  })

})
