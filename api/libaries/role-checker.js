const User = require('../models/user')

const isAdmin = user => {
  const userWithLastestUpdated = new User().getById(user._id)

  if (userWithLastestUpdated.role === 'ADMIN') {
    return true
  }

  return false
}

module.exports = isAdmin
