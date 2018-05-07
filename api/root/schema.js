export default [`
  type Query {
    user (
      _id: ID
      email: String!
    ): User

    users (
      limit: Int
      skip: Int
    ): [User]

    category (
      _id: ID
      name: String!
    ): Category

    categories (
      limit: Int
      skip: Int
    ): [Category]

    subCategory (
      _id: ID
      categoryId: ID!
    ): SubCategory

    subCategories (
      limit: Int
      skip: Int
      categoryId: ID
    ): [SubCategory]

    categoryProp (
      _id: ID
      categoryId: ID!
    ): CategoryProp

    categoryProps (
      categoryId: ID!
    ): [CategoryProp]

    subCategoryProp (
      _id: ID
      subCategoryId: ID!
    ): SubCategoryProp

    subCategoryProps (
      subCategoryId: ID!
    ): [SubCategoryProp]
  }

  type Mutation {
    createUser (
      email: String!
      password: String!
    ): User

    createCategory (
      name: String!
    ): Category

    createSubCategory (
      categoryId: ID!
      name: String!
    ): SubCategory

    createCategoryProp (
      categoryId: ID!
      name: String!
      values: [String]
    ): CategoryProp

    createSubCategoryProp (
      subCategoryId: ID!
      name: String!
      values: [String]
    ): SubCategoryProp

    createWishlist (
      userId: ID!
      wishlist: WishlistInput!
    ): User
  }

  type Updated {
    updated: Int
  }
`]
