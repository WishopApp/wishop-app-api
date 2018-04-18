export default [`
type Address {
  district: String
  province: String
  country: String
  zipcode: String
  detail: String
}

input AddressInput {
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

input ProfileInput {
  name: String
  telNo: String
  avatarUrl: String
  address: AddressInput
}

type User {
  _id: ID
  email: String
  password: String
  facebookId: String
  profile: Profile
  storeIds: [ID]
  wishlistProducts: [Wishlist]
  wishlistSets: [WishlistSet]
}
`]
