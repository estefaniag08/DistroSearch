const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Etiquetas = db.define('etiquetas', {

}, {
    underscorsed: true,
    freezeTableName: true
})