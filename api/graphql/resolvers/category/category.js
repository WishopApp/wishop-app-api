const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const properties = baseResolver.createResolver(
  async (category, args, context) => {
    return context.models.categoryProp.getByCategoryId(category._id)
  }
)

const subCategories = baseResolver.createResolver(
  async (category, args, context) => {
    return context.models.subCategory.getByCategoryId(category._id)
  }
)

module.exports = {
  Category: {
    properties,
    subCategories,
  },
}
