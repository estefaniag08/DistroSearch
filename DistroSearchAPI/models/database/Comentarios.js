const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Comentarios = db.define('comentarios', {
    id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    texto_comentario: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
});

