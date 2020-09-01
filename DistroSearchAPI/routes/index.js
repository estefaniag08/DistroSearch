const express = require('express');
const router = express.Router();
const databaseControler = require('../controllers/databaseController');

module.exports = function(){
    //Saludo del bot Ñu
    router.get('/', function(req, res) {
        res.json('Holis')
    });

    //Mostrar todas las distribuciones de la base de datos
    router.get('/distribuciones', databaseControler.mostrarDistribuciones);

    //Mostrar toda la información de una distribución por su nombre
    router.get('/distribuciones/:nombreDistro' );

    //Mostrar la información general de una distribución por su nombre
    router.get('/distribuciones/info-general/:nombreDistro' );

    //Mostrar la información técnica de una distribución por su nombre
    router.get('/distribuciones/doc-general/:nombreDistro' );

    //Mostrar la documentación de una distribución por su nombre
    router.get('/distribuciones/documentacion/:nombreDistro' );

    //Mostrar los comentarios de una distribución por su nombre con el usuario que hizo el comentario
    router.get('/distribuciones/:nombreDistro/comentarios' );

    //Mostrar las etiquetas de una distribución por su nombre
    router.get('/distribuciones/:nombreDistro/etiquetas' );

    //Mostrar todas las distribuciones que tengan la etiqueta especificada
    router.get('distribuciones/etiquetas/:etiqueta' );

    //Mostrar las hijas de una distribución por su nombre
    router.get('/distribuciones/:nombreDistro/nodos');

    //Añadir una distribución (Toda la información)
    router.post('/distribuciones', databaseControler.anadirDistribucion);

    //Añadir un comentario a una distribución
    router.post('/distribuciones/:nombreDistro/comentarios', databaseControler.anadirComentario);
    
    //Registrar nuevo usuario
    router.post('/usuarios', databaseControler.registrarUsuario)

    //Añadir una etiqueta existente a una distribución
    router.post('/distribuciones/:nombreDistro/etiquetas', databaseControler.anadirEtiquetaADistro);

    //Crear una etiqueta
    router.post('/etiquetas', databaseControler.crearEtiqueta);

    //Votar por una etiqueta de una distribución
    router.put('/distribuciones/:nombreDistro/etiquetas', databaseControler.votarEtiqueta );

    //Modificar la información de la distribución
    router.put('/distribuciones/:nombreDistro');

    return router;
}   