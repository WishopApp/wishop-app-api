// const cryptoJS = require('crypto-js')
const bcrypt = require('bcrypt')

// const encryptDataBySalt = data => {
//   if (!data) {
//     throw new Error('Data for encrypt is required.')
//   }

//   return cryptoJS.AES.encrypt(data, process.env.WISHOP_SECRET_SALT).toString()
// }

// const decryptDataBySalt = (encryptedData = '') => {
//   return cryptoJS.AES.decrypt(
//     encryptedData,
//     process.env.WISHOP_SECRET_SALT
//   ).toString(cryptoJS.enc.Utf8)
// }

/**
 * COMPARE BCRYPT DATA
 * for compare user's password
 */
const compareBcrypt = (input, hash) => {
  if (!input || !hash) {
    throw new Error('Data for compare bcrypt data is required.')
  }

  const inputWithSalt = input + process.env.WISHOP_SECRET_SALT
  return bcrypt.compare(inputWithSalt, hash)
}

/**
 * CREATE BCRYPT DATA
 * for create one-way password for user account
 */
const createBcryptData = data => {
  if (!data) {
    throw new Error('Data for create bcrypt data is required.')
  }

  const dataWithSalt = data + process.env.WISHOP_SECRET_SALT
  return bcrypt.hash(dataWithSalt, 12)
}

module.exports = {
  // encryptDataBySalt,
  // decryptDataBySalt,
  compareBcrypt,
  createBcryptData,
}
