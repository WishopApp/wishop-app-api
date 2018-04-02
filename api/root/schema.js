export default [`
  type Query {
    user: String
    users: String
  }

  type Mutation {
    createUser (
      email: String
      password: String
    ): User
  }

  type Updated {
    updated: Int
  }
`]
