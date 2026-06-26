const Sequelize = require("sequelize");
const {development} = require("./config")

console.log({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "***set***" : "missing",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});


const sequelize = new Sequelize(
    // process.env.DATABASE_URI
    development.database,
    development.username,
    development.password,
    {
        host: development.host,
        dialect: development.dialect,
        port: process.env.DB_PORT,
        logging: console.log
    }
);
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connnection error:", err);
    }
};

console.log({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

module.exports = {sequelize, connectDB};