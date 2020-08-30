const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Comentarios = db.define('comentarios', {

}, {
    underscorsed: true,
    freezeTableName: true
})