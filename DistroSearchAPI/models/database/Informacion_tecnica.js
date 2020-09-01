const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Informacion_tecnica = db.define('Informacion_tecnica', {
    id_informacion_tecnica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    arquitectura: {
        type: DataTypes.STRING(10)
    },
    interfaz_grafica: {
        type: DataTypes.STRING(100)
    },
    sistema_gestion_paquetes: {
        type: DataTypes.STRING(50)
    },
    metodo_actualizacion: {
        type: DataTypes.STRING(50)
    },
    versiones: {
        type: DataTypes.STRING(200)
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
});

module.exports = Informacion_tecnica;