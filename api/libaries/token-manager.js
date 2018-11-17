const jwt = require('jsonwebtoken')

const getUserFromToken = token => {
  if (!token) {
    throw new Error('Token for verify user is not provided.')
  }

  const data = jwt.verify(token, process.env.TOKEN_SECRET)

  if (!data.user) {
    return null
  }

  return data.user
}

const createUserToken = user => {
  if (!user) {
    throw new Error('User for create token is not provided.')
  }

  const userToken = jwt.sign(
    { user: { _id: user._id } },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '24h',
    }
  )

  return userToken
}

module.exports = {
  getUserFromToken,
  createUserToken,
}
