import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT 
});

sequelize.authenticate().then(()=> {
  console.log("connected to the database");
}).catch(()=>{
  console.log("Oppps! Could not connect!");
})