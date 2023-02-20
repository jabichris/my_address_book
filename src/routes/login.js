'use strict'

const bcrypt = require('bcryptjs')
const Boom = require('boom')
const db = require('../models')
const createToken = require('../utils/token')

const { User } = db

const loginHandler = (request, h) => {
  return h.view('login')
}
const unfoundHandler = (request, h) => {
       return h.view('404')
  }

module.exports = {
  method: 'POST',
  path: '/api/v1/auth/login',
  config: {
    auth: false,
  },
  handler: async (request, h) => {
    const userExist = await User.findOne({
      where: {
        email: request.payload.email,
      },
    })

    if (!userExist) {
      throw Boom.badRequest('Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(
      request.payload.password,
      userExist.password
    )

    if (!passwordMatch) {
      throw Boom.badRequest('Invalid credentials')
    }

    console.log(userExist)
    const response = {
      token: createToken({ id: userExist.id, email: userExist.email }),
    }

    return response
  },
}

module.exports = [{
  method: 'GET',
  path: '/login',
  config: {
    auth: false,
  },
  handler:  loginHandler
},
{
  method: 'GET',
  path: '/{any*}',
  config: {
    auth: false,
  },
  handler:  unfoundHandler
}
]
