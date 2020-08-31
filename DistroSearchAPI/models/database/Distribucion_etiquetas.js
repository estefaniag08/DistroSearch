const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../../config/db');
const Etiquetas = require('./Etiquetas')
const Distribucion_etiquetas = db.define('distribucion_etiquetas', {
    id_distro_etiqueta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    votos: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
});

Etiquetas.hasMany(Distribucion_etiquetas, {
    foreignKey:{
        name: 'etiqueta_id',
        allowNull: false
    }
});

module.exports = Distribucion_etiquetas;