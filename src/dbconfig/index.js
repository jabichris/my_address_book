const { Sequelize } = require( 'sequelize');
const dotenv = require( 'dotenv');
const config = require('../config/config')

dotenv.config()

const env = process.env.NODE_ENV || 'development'
console.log('env:::', env)

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
  // process.env.DB_NAME,
  // process.env.DB_USERNAME,
  // process.env.DB_PASSWORD,
  // {
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   dialect: process.env.DIALECT,
  // }
)
console.log('sequelize:::', sequelize)
// const getUsers = async () =>  {
// try{
//   await sequelize.authenticate();
//   console.log("connected to the database");
//   const [results, metadata] = await sequelize.query('SELECT * FROM Users')
//   return results;
// }catch(error){
//   console.log("Oppps! Could not connect!",err);
// }
// }

export default sequelize
