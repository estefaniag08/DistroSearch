const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');
const Comentarios = require('./Comentarios');
const Distribucion = require('./Distribucion');
const Distribucion_comentarios = db.define('distribucion_comentarios', {
    id_distro_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    underscorsed: true,
    freezeTableName: true,
    alter:true
});

module.exports = Distribucion_comentarios;