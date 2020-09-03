const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/db');

const Informacion_documentacion = require('./Informacion_documentacion');
const Distribucion_etiquetas = require('./Distribucion_etiquetas');
const Informacion_tecnica = require('./Informacion_tecnica');
const Informacion_general = require('./Informacion_general');
const Distribucion_comentarios = require('./Distribucion_comentarios');
const Comentarios = require('./Comentarios');
//const Distribucion_etiqueta = require('./Distribucion_etiquetas');
const Etiqueta = require('./Etiquetas');
const Usuario = require('./Usuario');

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

Distribucion.hasOne(Informacion_documentacion, {
    foreignKey: {
        name: 'distribucion_id'
    }
});
// Llave foránea distribucion_id en la tabla Informacion_documentacion
Informacion_documentacion.belongsTo(Distribucion,{
    foreignKey:{
        name: 'distribucion_id'
    }
});


Distribucion.hasOne(Informacion_tecnica, {
    foreignKey: {
        name: 'distribucion_id'
    }
});

Informacion_tecnica.belongsTo(Distribucion,{
    foreignKey:{
        name: 'distribucion_id'
    }
});


Distribucion.hasOne(Informacion_general, {
    foreignKey: {
        name: 'distribucion_id'
    }
});

Informacion_general.belongsTo(Distribucion,{
    foreignKey:{
        name: 'distribucion_id'
    }
});

Distribucion.belongsTo(Distribucion, {
    as: 'padre',
    foreignKey:{
        name: 'familia_id',
        allowNull: true,
        alter: true
    }
});

Distribucion.hasMany(Distribucion, {
    as: 'hijos',
    foreignKey:{
        name: 'familia_id',
        allowNull: true,
        alter: true
    }
});

//Lláve foránea en distribucion_id en Distribucion_etiquetas


Distribucion_comentarios.belongsTo(Distribucion, {
    foreignKey: {
        name: 'distribucion_id'
    }
})

Distribucion.hasMany(Distribucion_comentarios,{
    foreignKey:{
        name: 'distribucion_id',
        allowNull: false
    }
});


Distribucion_comentarios.belongsTo(Comentarios, {
    foreignKey: {
        name: 'comentario_id'
    }
})

Comentarios.hasMany(Distribucion_comentarios,{
    foreignKey:{
        name: 'comentario_id',
        allowNull: false
    }
});

////////////////////

Distribucion_etiquetas.belongsTo(Distribucion, {
    foreignKey: {
        name: 'distribucion_id'
    }
})

Distribucion.hasMany(Distribucion_etiquetas,{
    foreignKey:{
        name: 'distribucion_id',
        allowNull: false
    }
});


Distribucion_etiquetas.belongsTo(Etiqueta, {
    foreignKey: {
        name: 'etiqueta_id'
    }
})

Etiqueta.hasMany(Distribucion_etiquetas,{
    foreignKey:{
        name: 'etiqueta_id',
        allowNull: false
    }
});

Usuario.hasMany(Comentarios, {
    foreignKey: {
        name: 'usuario_id'
    }
})

Comentarios.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id'
    }
})

/*
Distribucion.belongsToMany(Comentarios, {
    through: Distribucion_comentarios, 
    uniqueKey: 'distribucion_id'
});

Comentarios.belongsToMany(Distribucion, {
    through: Distribucion_comentarios, 
    uniqueKey: 'comentario_id'
});

*/
module.exports = Distribucion;