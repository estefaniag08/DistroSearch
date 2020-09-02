const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Etiquetas = db.define('etiquetas', {
    id_etiqueta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_etiqueta: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    underscorsed: true,
    freezeTableName: true,
    alter: true
});


module.exports = Etiquetas;