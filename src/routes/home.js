module.exports = {
  method: 'GET',
  path: '/api/v1',
  config: {
    auth: 'jwt',
  },
  handler: (request, h) => {
    return { text: 'You used a Token!' }
    // const response = h.response({ text: 'You used a Token!' })
    // response.header('Authorization', request.headers.authorization)
    // return response
  },
}
