const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Informacion_general = db.define('informacion_general', {
    id_informacion_general: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    descripcion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    categoria: {
        type: DataTypes.STRING
    },
    origen: {
        type: DataTypes.STRING
    },
    idiomas: {
        type: DataTypes.STRING
    },
    requerimientos: {
        type: DataTypes.STRING
    },
    historia: {
        type: DataTypes.STRING
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
})