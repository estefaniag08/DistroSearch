const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Distribucion_comentarios = db.define('distribucion_comentarios', {

}, {
    underscorsed: true,
    freezeTableName: true
})