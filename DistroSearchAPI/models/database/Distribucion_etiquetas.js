const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Distribucion_etiquetas = db.define('distribucion_etiquetas', {

}, {
    underscorsed: true,
    freezeTableName: true
})