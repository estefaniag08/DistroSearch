const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Informacion_tecnica = db.define('Informacion_tecnica', {
    id_informacion_tecnica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    arquitectura: {
        type: DataTypes.STRING
    },
    interfaz_grafica: {
        type: DataTypes.STRING
    },
    sistema_gestion_paquetes: {
        type: DataTypes.STRING
    },
    metodo_actualizacion: {
        type: DataTypes.STRING
    },
    versiones: {
        type: DataTypes.STRING
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
})