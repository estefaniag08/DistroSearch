const Distribucion = require('../models/database/Distribucion');
const Informacion_documentacion = require('../models/database/Informacion_documentacion');
const Informacion_general = require('../models/database/Informacion_general');
const Informacion_tecnica = require('../models/database/Informacion_tecnica');
const Distribucion_comentarios = require('../models/database/Distribucion_comentarios');
const Comentarios = require('../models/database/Comentarios');
const Usuarios = require('../models/database/Usuario');

exports.mostrarDistribuciones = async (req, res) => {
    try{
        const listaDistribuciones = await Distribucion.findAll({
            attributes: ['id_distribucion', 'nombre_distribucion']
        });
        res.status(200).json(listaDistribuciones);
    } catch (error){
        res.status(500).send(error);
    }

}

exports.mostrarDistribucion = async (req, res) => {
    try {
        const distribucion = await Distribucion.findOne({ 
            where: { 
                nombre_distribucion: req.params.nombreDistro 
            },
            include: [{
                model: Informacion_documentacion,
                exclude:['createdAt', 'updatedAt']
            },{
                model: Informacion_general
            },{
                model: Informacion_tecnica   
            }]   
        });
        res.status(200).json(distribucion);
    } catch (error) {
        res.status(500).send(error);        
    }
}


exports.mostrarInfoGeneral = async (req, res) => {
    try {
        const distribucion = await Distribucion.findOne({
            attributes: ['id_distribucion', 'nombre_distribucion'],
            where: { 
                nombre_distribucion: req.params.nombreDistro 
            },
            include: {
                model: Informacion_general,
                right: true
            }
        })
        res.status(200).json(distribucion);
    } catch (error) {
        res.status(500).send(error);        
    }
}

exports.mostrarInfoTecnica = async (req, res) => {
    try {
        const distribucion = await Distribucion.findOne({
            attributes: ['id_distribucion', 'nombre_distribucion'],
            where: { 
                nombre_distribucion: req.params.nombreDistro 
            },
            include: {
                model: Informacion_tecnica,
                right: true
            }
        })
        res.status(200).json(distribucion);
    } catch (error) {
        res.status(500).send(error);        
    }
}

exports.mostrarInfoDoc = async (req, res) => {
    try {
        const distribucion = await Distribucion.findOne({
            attributes: ['id_distribucion', 'nombre_distribucion'],
            where: { 
                nombre_distribucion: req.params.nombreDistro 
            },
            include: {
                model: Informacion_documentacion,
                right: true
            }
        })
        res.status(200).json(distribucion);
    } catch (error) {
        res.status(500).send(error);        
    }
}

exports.mostrarComentarios = async (req, res) => {
    try {
        const distribucion = await Distribucion.findOne({
            attributes: ['id_distribucion', 'nombre_distribucion'],
            where: { 
                nombre_distribucion: req.params.nombreDistro 
            },
            include: [{
                model: Distribucion_comentarios,
                include: [{
                    model: Comentarios
                }]
            }]
        })
        res.status(200).json(distribucion);
    } catch (error) {
        res.status(500).send(error);        
    }
}

/**
 * Json con la información que puede ir para añadir
 * @param nombre_distribucion Obligatorio
 * @param fecha_ultima_version
 * @param nombre_padre El nombre de la distribución padre
 * @param licencia 
 * @param descripcion
 * @param estado Uno o cero
 * @param categoria
 * @param origen
 * @param idiomas
 * @param historia
 * @param arquitectura
 * @param interfaz_grafica
 * @param sistema_gestion_paquetes
 * @param metodo_actualizacion
 * @param versiones
 * @param url_distribucion
 * @param url_documentacion
 * @param url_instalacion
 * 
 */
exports.anadirDistribucion = async (req, res) => {
    try{
        const {nombre_distribucion, fecha_ultima_version, nombre_padre, licencia, 
            descripcion, estado, categoria, origen, idiomas, historia, arquitectura, 
            interfaz_grafica, sistema_gestion_paquetes, metodo_actualizacion, versiones, 
            url_distribucion, url_documentacion, url_instalacion} = req.body;
        /*
        const padre = await Distribucion.findOne({
            where:{
                nombre_distribucion: req.body.nombre_padre
            }
        });*/
        const [distribucion, created] = await Distribucion.findOrCreate({
            where: {
                nombre_distribucion
            },
            defaults:{
                nombre_distribucion,
                fecha_ultima_version,
                //familia_id : padre.id_distribucion,
                licencia
            }
        });

        await Informacion_general.create({
            descripcion,
            estado,
            categoria,
            origen,
            idiomas,
            requerimientos,
            historia,
            distribucion_id: distribucion.id_distribucion
        });

        await Informacion_tecnica.create({
            arquitectura,
            interfaz_grafica,
            sistema_gestion_paquetes,
            metodo_actualizacion,
            versiones,
            distribucion_id: distribucion.id_distribucion
        });
        
        await Informacion_documentacion.create({
            url_distribucion,
            url_documentacion,
            url_instalacion,
            distribucion_id: distribucion.id_distribucion
        })
        res.status(200).send('Distribución añadida con éxito');
    } catch(error){
        res.status(500).json(error);
    }
}

exports.anadirComentario = async (req, res) => {
    try{
        
        res.status(200).send('Comentario anadido con éxito');
    } catch(error){
        res.status(500).send(error);
    }
}