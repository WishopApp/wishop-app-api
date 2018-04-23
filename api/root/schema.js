export default [`
  type Query {
    user (
      _id: ID!
    ): User

    users (
      limit: Int
      skip: Int
    ): [User]

    category (
      _id: ID!
    ): Category

    categories (
      limit: Int
      skip: Int
    ): [Category]

    subCategory (
      _id: ID!
    ): SubCategory

    subCategories (
      limit: Int
      skip: Int
    ): [SubCategory]

    categoryProp (
      _id: ID!
    ): CategoryProp

    categoryProps (
      categoryId: ID!
    ): [CategoryProp]

    subCategoryProp (
      _id: ID!
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

    createWishlistSet (
      userId: ID!
      wishlistSet: WishlistSetInput!
    ): User
  }

  type Updated {
    updated: Int
  }
`]
