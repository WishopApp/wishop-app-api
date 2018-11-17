const User = require('../models/user')

const isAdmin = async user => {
  const userWithLastestUpdated = await new User().getById(user._id)

  if (userWithLastestUpdated.role === 'ADMIN') {
    return true
  }

  return false
}

module.exports = isAdmin
