const express = require('express');

const routes = require('./routes');

const db = require('./config/db');
const bodyParser = require('body-parser');

require('dotenv').config({path: 'variables.env'});

db.sync().then( ()=> console.log('DB Conectada')).catch((error)=>{console.log(error)});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());
app.listen(process.env.PUERTO, process.env.HOST);