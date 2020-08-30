const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Distribucion = db.define('distribucion', {

}, {
    underscorsed: true,
    freezeTableName: true
})