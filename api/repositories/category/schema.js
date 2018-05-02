export default [`
type Category {
  _id: ID
  name: String
  subCategoryIds: [ID]
  catePropIds: [ID]
  properties: [CategoryProp]
  subCategories: [SubCategory]
}
`]
