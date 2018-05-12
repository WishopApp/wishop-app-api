const supertest = require('supertest')

describe('App', () => {
  describe('GET /graphiql', () => {
    it('it should response 200 status code', (done) => {
      supertest('http://127.0.0.1:3000/graphiql')
        .get('/')
        .then((res) => {
          expect(res.statusCode).toBe(200)
          done()
        })
    })
  })
})
