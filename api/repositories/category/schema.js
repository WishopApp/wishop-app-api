module.exports = [`
type Category {
  _id: ID
  name: String
  properties: [CategoryProp]
  subCategories: [SubCategory]
}
`]
