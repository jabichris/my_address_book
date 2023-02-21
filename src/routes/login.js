'use strict'

const bcrypt = require('bcryptjs')
const Boom = require('boom')
const db = require('../models')
const createToken = require('../utils/token')

const { User } = db

const loginHandlerView = (request, h) => {
  return h.view('login')
}
const unfoundHandler = (request, h) => {
       return h.view('404')
  }
const loginHandler = async (request, h) => {
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

  const response = {
    token: createToken({ id: userExist.id, email: userExist.email }),
  }
  const result = {
    message: 'Login successful',
    token: response.token,
  };
  console.log(result)
  return result;
}

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    config: {
      auth: false,
    },
    handler: loginHandler
  }, {
  method: 'GET',
  path: '/login',
  config: {
    auth: false,
  },
  handler:  loginHandlerView
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
