const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Distribucion_comentarios = db.define('distribucion_comentarios', {
    id_distro_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    },
    comentario_id: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
})