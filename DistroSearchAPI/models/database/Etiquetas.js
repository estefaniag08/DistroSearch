const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Etiquetas = db.define('etiquetas', {
    id_etiqueta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    nombre_etiqueta: {
        type: DataTypes.STRING
    }
}, {
    underscorsed: true,
    freezeTableName: true
})