const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');
const Usuario = require('./Usuario');

const Comentarios = db.define('comentarios', {
    id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    texto_comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    underscorsed: true,
    freezeTableName: true
});
Usuario.hasMany(Comentarios, {
    foreignKey: {
        name: 'usuario_id',
        allowNull: false
    }
});
module.exports = Comentarios;
