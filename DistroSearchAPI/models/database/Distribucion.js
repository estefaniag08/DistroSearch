const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Informacion_documentacion = require('./Informacion_documentacion');
const Distribucion_etiquetas = require('./Distribucion_etiquetas');
const Informacion_tecnica = require('./Informacion_tecnica');
const Informacion_general = require('./Informacion_general');
const Distribucion_comentarios = require('./Distribucion_comentarios');

const Distribucion = db.define('distribucion', {
    id_distribucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_distribucion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_ultima_version: {
        type: DataTypes.DATE
    },
    familia_id: {
        type: DataTypes.INTEGER
    },
    licencia: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {
    underscorsed: true,
    freezeTableName: true,
    alter: true
});

// Llave foránea distribucion_id en la tabla Informacion_documentacion
Informacion_documentacion.belongsTo(Distribucion,{
    foreignKey:{
        name: 'distribucion_id'
    }
});

Informacion_tecnica.belongsTo(Distribucion,{
    foreignKey:{
        name: 'distribucion_id'
    }
});

Informacion_general.belongsTo(Distribucion,{
    foreignKey:{
        name: 'distribucion_id'
    }
});

Distribucion.belongsTo(Distribucion, {
    foreignKey:{
        name: 'familia_id',
        allowNull: true,
        alter: true
    }
});

//Lláve foránea en distribucion_id en Distribucion_etiquetas
Distribucion.hasMany(Distribucion_etiquetas,{
    foreignKey:{
        name: 'distribucion_id',
        allowNull: false
    }
});

Distribucion.hasMany(Distribucion_comentarios,{
    foreignKey:{
        name: 'distribucion_id',
        allowNull: false
    }
});

module.exports = Distribucion;