const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Distribucion = require('./Distribucion');

const Informacion_documentacion = db.define('informacion_documentacion', {
    id_informacion_documentacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    url_distribucion: {
        type: DataTypes.STRING
    },
    url_documentacion: {
        type: DataTypes.STRING
    },
    url_instalacion: {
        type: DataTypes.STRING
    },
    distribucion_id: {
        type: DataTypes.INTEGER
    }
}, {
    underscorsed: true,
    freezeTableName: true
});

//Informacion_documentacion.belongsTo(Distribucion);

module.exports = Informacion_documentacion;


