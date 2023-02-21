'use strict'
require('dotenv').config()

const JWT = require('jsonwebtoken')

function createToken(user) {
  return JWT.sign({ id: user.id, email: user.email }, process.env.SECRET, {
    expiresIn: '1h',
  })
}

module.exports = createToken
