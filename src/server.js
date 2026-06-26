const dotenv = require("dotenv");

dotenv.config({ path: './../config.env'})

const app = require("./app");

const port = process.env.PORT

const { connectDB } = require('./config/db');
const { development } = require("./config/config");

// console.log(process.env.PORT);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

console.log(typeof process.env.DB_PASSWORD);


console.log("DB_PASSWORD:", process.env.DB_PASSWORD);


development;
// console.log("from config:", development.password);
// console.log("from config:", development.database);
// console.log("from config:", development.host);
connectDB();