const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const properties = baseResolver.createResolver(
  async (category, args, context) => {
    return context.categoryProp.getByCategoryId(category._id)
  }
)

const subCategories = baseResolver.createResolver(
  async (category, args, context) => {
    return context.subCategory.getByCategoryId(category._id)
  }
)

module.exports = {
  Category: {
    properties,
    subCategories
  }
}
