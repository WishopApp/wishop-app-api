const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const category = baseResolver.createResolver(
  async (categoryRanking, args, context) => {
    return context.models.category.getOne({ _id: categoryRanking.categoryId })
  }
)

module.exports = {
  CategoryRanking: {
    category,
  },
}
