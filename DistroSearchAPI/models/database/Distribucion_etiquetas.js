const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../../config/db');
const Etiquetas = require('./Etiquetas')
const Distribucion_etiquetas = db.define('distribucion_etiquetas', {
    id_distro_etiqueta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    votos: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
});


module.exports = Distribucion_etiquetas;