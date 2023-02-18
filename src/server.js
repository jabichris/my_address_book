import Hapi from '@hapi/hapi';
import dotenv from 'dotenv'

dotenv.config()

const server = Hapi.Server({ 
  host: process.env.HOST,
  port: process.env.PORT 
})

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return '<h1>Welcome to My Address Book</h1>'
       },
  })

  await server.start()
  console.log(`Server is running on : ${server.info.uri}`)
}

process.on('unhandledRejection', (err)=>{
  console.log('error:::', err);
  process.exit(1);
})

init()
