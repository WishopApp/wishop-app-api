export default [`
  type Query {
    user: User
    users: [User]
    category: Category
    categories: [Category]
    subCategory: SubCategory
    subCategories: [SubCategory]
    categoryProp: CategoryProp
    categoryProps: [CategoryProp]
    subCategoryProp: SubCategoryProp
    subCategoryProps: [SubCategoryProp]
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
