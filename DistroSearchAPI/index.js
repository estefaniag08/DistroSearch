const express = require('express');
const userModel = require('./models/database/Distribucion');
const routes = require('./routes');

const db = require('./config/db');
const bodyParser = require('body-parser');

require('dotenv').config({path: 'variables.env'});

db.sync().then( ()=> console.log('DB Conectada')).catch((error)=>{console.log(error)});

/*
const ab = await userModel.create({
    nombre_distribucion: 'Mint',
    fecha_ultima_version: new Date(1980, 6, 20),
    licencia: 'GPL'
})
*/

//userModel.sync({ force: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());
app.listen(process.env.PUERTO, process.env.HOST);