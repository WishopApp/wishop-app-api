export default [`

type CategoryProps {
  categoryId: ID
  value: String
}

input CategoryPropsInput {
  categoryId: ID
  value: String
}

type SubCategoryProps {
  subCategoryId: ID
  value: String
}

input SubCategoryPropsInput {
  subCategoryId: ID
  value: String
}

type Wishlist {
  name: String
  productName: String
  categoryId: ID
  subCategoryId: ID
  categoryProps: [CategoryProps]
  subCategoryProps: [SubCategoryProps]
}

input WishlistInput {
  name: String!
  productName: String
  categoryId: ID!
  subCategoryId: ID!
  categoryProps: [CategoryPropsInput]
  subCategoryProps: [SubCategoryPropsInput]
}
`]
