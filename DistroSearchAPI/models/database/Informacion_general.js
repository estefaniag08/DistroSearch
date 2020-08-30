const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Informacion_general = db.define('informacion_general', {

}, {
    underscorsed: true,
    freezeTableName: true
})