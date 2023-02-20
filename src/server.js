const Hapi = require('@hapi/hapi')
const glob = require('glob')
const path = require('path')
const db = require('./models')

require('dotenv').config()

const { User } = db

const secret = process.env.SECRET

const validate = async function (decoded, request, h) {
  const currentUser = await User.findOne({
    where: {
      id: decoded.id,
    },
  })

  if (!currentUser) {
    return { isValid: false }
  }

  return {
    isValid: true,
  }
}

const init = async () => {
  const server = new Hapi.server({ host: 'localhost', port: 8000 })
  // await server.register(require('hapi-auth-jwt2','@hapi/vision'))
  await server.register([
    require('hapi-auth-jwt2'),
    require('@hapi/vision')
  ]);
  // await server.register([
  //   {
  //     plugin: require('hapi-auth-jwt2'),
  //     options: {
  //       // plugin 1 options
  //     }
  //   },
  //   {
  //     plugin: require('my-plugin-2'),
  //     options: {
  //       // plugin 2 options
  //     }
  //   }
  // ]);
  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    validate,
    verifyOptions: { ignoreExpiration: false },
  })

  server.auth.default('jwt')
  server.views(
  //   {
  //   engines:{
  //     html: require('handlebars')
  //   },
  //   path: path.join(__dirname, 'views')
  // }
  {
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  }
  )
  glob
    .sync('src/routes/*js', {
      root: __dirname,
    })
    .forEach((file) => {
      const route = require(path.join(__dirname, file.replace('src', '')))
      console.log(route)
      server.route(route)
    })

  await server.start()
  return server
}

init()
  .then((server) => {
    console.log('Server running at:', server.info.uri)
  })
  .catch((err) => {
    console.log(err)
  })
