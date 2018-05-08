export default [`

type WishlistCategoryProp {
  name: String
  value: String
}

type WishlistSubCategoryProp {
  name: String
  value: String
}

type Wishlist {
  _id: ID
  name: String
  productName: String
  categoryId: ID
  category: Category
  subCategoryId: ID
  subCategory: SubCategory
  categoryProps: [WishlistCategoryProp]
  subCategoryProps: [WishlistSubCategoryProp]
}

input WishlistCategoryPropInput {
  categoryPropId: ID
  value: String
}

input WishlistSubCategoryPropInput {
  subCategoryPropId: ID
  value: String
}

input WishlistInput {
  name: String!
  productName: String
  categoryId: ID!
  subCategoryId: ID!
  categoryProps: [WishlistCategoryPropInput]
  subCategoryProps: [WishlistSubCategoryPropInput]
}

input UpdateWishlist {
  name: String
  productName: String
  categoryId: ID
  subCategoryId: ID
  categoryProps: [WishlistCategoryPropInput]
  subCategoryProps: [WishlistSubCategoryPropInput]
}
`]
