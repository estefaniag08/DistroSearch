const express = require('express');
const router = express.Router();
const databaseControler = require('../controllers/databaseController');

module.exports = function(){
    //Saludo del bot Ñu
    router.get('/', function(req, res) {
        res.json('Hola, estás conectado al API DistroSearch');
    });
    //Mostrar todas las distribuciones de la base de datos
    router.get('/distribuciones', databaseControler.mostrarDistribuciones);
    
    //Mostrar toda la información de una distribución por su nombre
    router.get('/distribuciones/:nombreDistro', databaseControler.mostrarDistribucion );
    
    //Mostrar la información general de una distribución por su nombre
    router.get('/distribuciones/info-general/:nombreDistro', databaseControler.mostrarInfoGeneral );
    
    //Mostrar la información técnica de una distribución por su nombre
    router.get('/distribuciones/info-tecnica/:nombreDistro', databaseControler.mostrarInfoTecnica );
    
    //Mostrar la documentación de una distribución por su nombre
    router.get('/distribuciones/info-documentacion/:nombreDistro', databaseControler.mostrarInfoDoc );
    
    //Mostrar los comentarios de una distribución por su nombre con el usuario que hizo el comentario
    router.get('/distribuciones/:nombreDistro/comentarios', databaseControler.mostrarComentarios );
    
    //Mostrar las etiquetas de una distribución por su nombre
    router.get('/distribuciones/:nombreDistro/etiquetas', databaseControler.mostrarEtiquetas );
    
    //Mostrar todas las distribuciones que tengan la etiqueta especificada
    router.get('/distribuciones/etiquetas/votos/:nomEtiqueta', databaseControler.mostrarDistribucionesEtiqueta );
    
    //Mostrar las hijas de una distribución por su nombre
    router.get('/distribuciones/:nombreDistro/nodos', databaseControler.mostrarHijasDistribucion);
    
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
    router.put('/distribuciones/:nombreDistro/etiquetas', databaseControler.votarEtiqueta);

    //Modificar la información de la distribución
    //router.put('/distribuciones/:nombreDistro', databaseControler.modificarDistribucion);

    return router;
}   