const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Informacion_documentacion = require('./Informacion_documentacion');

const Distribucion = db.define('distribucion', {
    id_distribucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_distribucion: {
        type: DataTypes.STRING
    },
    fecha_ultima_version: {
        type: DataTypes.DATE
    },
    familia_id: {
        type: DataTypes.INTEGER
    },
    licencia: {
        type: DataTypes.STRING
    }

}, {
    underscorsed: true,
    freezeTableName: true
});
/*
Distribucion.hasOne(Informacion_documentacion,{
    foreignKey:{
        name: 'distribucion_id'
    }
})

Informacion_documentacion.belongsTo(Distribucion);*/

Distribucion.hasMany(Distribucion);

Distribucion.belongsTo(Distribucion, {
    foreignKey:{
        name: 'familia_id',
        allowNull: true
    }
})


module.exports = Distribucion;