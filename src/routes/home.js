'use strict'

module.exports = [
//   {
//   method: 'GET',
//   path: '/api/v1',
//   config: {
//     auth: 'jwt',
//   },
//   handler: (request, h) => {
//     // return h.view('welcome')
//     const token = request.headers.authorization;
//     // const response = h.response({ text: 'You used a Token!' })
//     // console.log('>>>>>',response.header('Authorization', token))
//     // response.header('Authorization', token)
//     // return h.view('welcome', token)
//   },
// },
{
  method: 'GET',
  path: '/logout',
  config: {
    auth: 'jwt'
  },
  handler: async (request, h) => {
    return h.response({ message: 'Logout successful!' })
      .header('Authorization', null)  // Remove token from header
      .unstate('token');  // Remove token cookie
  }
},
{
  method: 'GET', 
  path: '/welcome', 
  config: { auth: 'jwt' },
  handler: function(request, h) {
    const token = request.headers.authorization;
    const response = h.view('welcome', token);
    response.header("Authorization", `Bearer ${token}`);
    return response;
  }}
]
