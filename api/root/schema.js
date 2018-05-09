module.exports = [`
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

    beacon (
      _id: ID
      token: String
    ): Beacon

    beacons (
      limit: Int
      skip: Int
    ): [Beacon]

    store (
      _id: ID
      name: String
    ): Store

    stores (
      limit: Int
      skip: Int
    ): [Store]

    storeBranch (
      _id: ID
      beaconToken: ID
    ): StoreBranch

    storeBranches (
      limit: Int
      skip: Int
    ): [StoreBranch]

    searchStoreBranch (
      beaconToken: String
    ): StoreBranch
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

    updateWishlist (
      userId: ID!
      wishlistId: ID!
      wishlist: UpdateWishlist!
    ): User

    removeWishlist (
      userId: ID!
      wishlistId: ID!
    ): User

    createBeacon (
      token: String
      name: String
    ): Beacon

    createStore (
      ownerId: ID!
      name: String!
      coverUrl: String
      avatarUrl: String
      description: String
    ): Store

    createStoreBranch (
      storeId: ID!
      name: String!
      telNo: String!
      beaconToken: String
    ): StoreBranch
  }

  type Updated {
    updated: Int
  }
`]
