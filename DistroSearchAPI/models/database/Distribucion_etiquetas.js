const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Distribucion_etiquetas = db.define('distribucion_etiquetas', {
    id_distro_etiqueta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    },
    etiqueta_id: {
        type: DataTypes.INTEGER
    },
    votos: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
})