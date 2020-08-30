const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Informacion_documentacion = db.define('informacion_documentacion', {

}, {
    underscorsed: true,
    freezeTableName: true
})