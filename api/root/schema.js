export default [`
  type Query {
    user: User
    users: [User]
    category: Category
    categories: [Category]
    subCategory: SubCategory
    subCategories: [SubCategory]
  }

  type Mutation {
    createUser (
      email: String
      password: String
    ): User

    createCategory (
      name: String
    ): Category

    createSubCategory (
      name: String
    ): SubCategory
  }

  type Updated {
    updated: Int
  }
`]
