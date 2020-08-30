const {Sequelize} = require('sequelize');
const db = require('../../config/db');

const Informacion_tecnica = db.define('Informacion_tecnica', {
    
}, {
    underscorsed: true,
    freezeTableName: true
})