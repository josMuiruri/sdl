import dotenv from "dotenv";
dotenv.config({ path: "./config.env "});

import Sequelize from "sequelize";

// console.log({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD ? "***set***" : "missing",
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
// });


export const sequelize = new Sequelize(
    process.env.DATABASE_URI,
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    
    // development.database,
    // development.username,
    // development.password,
    {
        // host: '127.0.0.1',
        // dialect: development.dialect,
        // port: process.env.DB_PORT,
        logging: console.log,
    }
);
export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connnection error:", err);
    }
};

// console.log({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
// });
