const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const properties = baseResolver.createResolver(
  async (subCategory, args, context) => {
    return context.models.subCategoryProp.getBySubCategoryId(subCategory._id)
  }
)

module.exports = {
  SubCategory: {
    properties,
  },
}
