const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const properties = baseResolver.createResolver(
  async (subCategory, args, context) => {
    return context.subCategoryProp.getBySubCategoryId(subCategory._id)
  }
)

module.exports = {
  SubCategory: {
    properties
  }
}
