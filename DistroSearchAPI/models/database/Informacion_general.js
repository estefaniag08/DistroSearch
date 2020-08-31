const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');


const Informacion_general = db.define('informacion_general', {
    id_informacion_general: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    categoria: {
        type: DataTypes.STRING(15)
    },
    origen: {
        type: DataTypes.STRING(100)
    },
    idiomas: {
        type: DataTypes.STRING(100)
    },
    requerimientos: {
        type: DataTypes.TEXT
    },
    historia: {
        type: DataTypes.TEXT
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
});

module.exports = Informacion_general