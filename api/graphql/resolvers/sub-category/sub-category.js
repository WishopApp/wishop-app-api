const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const properties = baseResolver.createResolver(
  async (subCategory, args, context) => {
    return context.models.subCategoryProp.getBySubCategoryId(subCategory._id)
  }
)

const category = baseResolver.createResolver(
  async (subCategory, args, context) => {
    return context.models.category.getOne({ _id: subCategory.categoryId })
  }
)

module.exports = {
  SubCategory: {
    category,
    properties,
  },
}
