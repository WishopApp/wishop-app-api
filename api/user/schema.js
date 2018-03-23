export default [`
type Address {
  district: String
  province: String
  country: String
  zipcode: String
  detail: String
}

type Profile {
  name: String
  telNo: String
  avatarUrl: String
  address: Address
}

type CategoryProps {
  categoryId: ID
  value: String
}

type SubCategoryProps {
  subCategoryId: ID
  value: String
}

type Wishlist {
  categoryId: ID
  subCategoryId: ID
  categoryProps: [CategoryProps]
  subCategoryProps: [SubCategoryProps]
}

type WishlistSet {
  name: String
  wishlists: [Wishlist]
}

type User {
  email: String
  password: String
  facebookId: String
  profile: Profile
  storeIds: [ID]
  wishlistProducts: [Wishlist]
  wishlistSets: [WishlistSet]
}
`]
