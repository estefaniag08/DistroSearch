const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');
const Comentarios = require('./Comentarios');
const Distribucion_comentarios = db.define('distribucion_comentarios', {
    id_distro_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    }
}, {
    underscorsed: true,
    freezeTableName: true,
    alter:true
});

Comentarios.hasMany(Distribucion_comentarios, {
    foreignKey: {
        name: 'comentario_id',
        allowNull: false
    }
});

module.exports = Distribucion_comentarios;