import dotenv from "dotenv";
dotenv.config({ path: './../config.env'});

console.log(process.env.DATABASE_URI);

const { default: app } = await import("./app.js");
const { connectDB, sequelize } = await import("./config/db.js");
// import app from "./app.js";
// import { connectDB } from './config/db.js';
// import { development } from "./config/config.js";

const port = process.env.PORT || 3000;

// console.log(process.env.PORT);
await connectDB();

await sequelize.sync({ alter: true });
// const startServer = async () => {
//     try {
//         await connectDB();

//         app.listen(port, () => {
//             console.log(`App running on port ${port}`)
//         });
//     } catch (err) {
//         console.error("failed to start server:", err);
//     }
// };

// startServer();
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})


// console.log(typeof process.env.DB_PASSWORD);


// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);


// development;
// console.log("from config:", development.password);
// console.log("from config:", development.database);
// console.log("from config:", development.host);
