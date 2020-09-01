const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');
const Comentarios = require('./Comentarios');

const Usuario = db.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    alias: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    activo:{
        type: DataTypes.BOOLEAN
    }
}, {
    underscorsed: true,
    freezeTableName: true
});

module.exports = Usuario;
