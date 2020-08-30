const Sequelize = require('sequelize');
require('dotenv').config({ path: 'variables.env'});

module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS ,{
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    pool: {
        max:5,
        min:0,
        acquire: 3000000,
        idle: 10000
    }
});
