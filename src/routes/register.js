'use strict'

const bcrypt = require('bcryptjs')
const Boom = require('boom')
const db = require('../models')
const createToken = require('../utils/token')

const { User } = db

const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash)
    })
  })
}
const registerHandler = async (request, h) => {
  const userExist = await User.findOne({
    where: {
      email: request.payload.email,
    },
  })

  if (userExist) {
    throw Boom.badRequest('User already exist')
  }

  let user = new User()

  user.email = request.payload.email
  user.firstName = request.payload.firstName
  user.lastName = request.payload.lastName

  hashPassword(request.payload.password, (err, hash) => {
    if (err) {
      throw Boom.badRequest(err)
    }
    user.password = hash
    user.save((err, user) => {
      if (err) {
        throw Boom.badRequest(err)
      }
    })
  })

  const response = {
    token: createToken({ id: user.id, email: user.email }),
  }
  console.log('response::', response)
  return h.view('welcome', { response })
}

const registerViewHandler = (request, h) => {
  return h.view('register')
 }
module.exports = [{
  method: 'POST',
  path: '/register-form',
  config: {
    auth: false,
  },
  handler: registerHandler,
},{
  method: 'GET',
  path: '/register',
  config: {
     auth: false,
   },
   handler: registerViewHandler
 }
]
