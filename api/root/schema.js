export default [`
  type Query {
    user: User
    users: [User]
    category: Category
    categories: [Category]
  }

  type Mutation {
    createUser (
      email: String
      password: String
    ): User

    createCategory (
      name: String
    ): Category
  }

  type Updated {
    updated: Int
  }
`]
