const Distribucion = require('../models/database/Distribucion');
const Informacion_documentacion = require('../models/database/Informacion_documentacion');
const Informacion_general = require('../models/database/Informacion_general');
const Informacion_tecnica = require('../models/database/Informacion_tecnica');
const Distribucion_comentarios = require('../models/database/Distribucion_comentarios');
const Comentarios = require('../models/database/Comentarios');
const Usuario = require('../models/database/Usuario');
const Etiquetas = require('../models/database/Etiquetas');
const Distribucion_etiquetas = require('../models/database/Distribucion_etiquetas');

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
 * @param requerimientos
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
            descripcion, estado, categoria, origen, idiomas, historia, requerimientos, arquitectura, 
            interfaz_grafica, sistema_gestion_paquetes, metodo_actualizacion, versiones, 
            url_distribucion, url_documentacion, url_instalacion} = req.body;
        let padre = null;
        if(nombre_padre){
            const distroPadre = await Distribucion.findOne({
                where:{
                    nombre_distribucion: nombre_padre
                }
            });
            padre = distroPadre.id_distribucion;
        } 
        const [distribucion, created] = await Distribucion.findOrCreate({
            where: {
                nombre_distribucion
            },
            defaults:{
                nombre_distribucion,
                fecha_ultima_version,
                familia_id : padre,
                licencia
            }
        });
        
        await Informacion_general.findOrCreate({
            where: {
                distribucion_id: distribucion.id_distribucion
            }, 
            defaults :{
                descripcion,
                estado,
                categoria,
                origen,
                idiomas,
                requerimientos,
                historia,
                distribucion_id: distribucion.id_distribucion
            }
        });

        await Informacion_tecnica.findOrCreate({
            where:{
                distribucion_id: distribucion.id_distribucion
            },
            defaults:{
                arquitectura,
                interfaz_grafica,
                sistema_gestion_paquetes,
                metodo_actualizacion,
                versiones,
                distribucion_id: distribucion.id_distribucion
            }
        });
        
        await Informacion_documentacion.findOrCreate({
            where:{
                distribucion_id: distribucion.id_distribucion
            },
            defaults:{
                url_distribucion,
                url_documentacion,
                url_instalacion,
                distribucion_id: distribucion.id_distribucion
            }
        })
        res.status(200).send('Distribución añadida con éxito');
    } catch(error){
        res.status(500).json(error);
    }
}
/**
 * El json para añadir el comentario debe tener la siguiente información
 * @param correo Correo de la persona que va a añadir el comentario
 * @param comentario Comentario de la distribución
 */
exports.anadirComentario = async (req, res) => {
    try{
        const {correo, comentario} = req.body;
        //Busca que exista el usuario
        const usuario = await Usuario.findOne({
            where:{
                correo
            }
        })
        if(!usuario){
            res.status(403).send('Usuario no registrado');
        } else {
            const comentarioF = await Comentarios.create({
                texto_comentario: comentario,
                usuario_id: usuario.id_usuario
            });
            const distribucion = await Distribucion.findOne({
                where:{
                    nombre_distribucion : req.params.nombreDistro
                }
            })
            if(!distribucion){
                res.send(403).send('No se encontró la distribución');
            } else {
                await Distribucion_comentarios.create({
                    comentario_id: comentarioF.id_comentario,
                    distribucion_id: distribucion.id_distribucion
                });
                res.status(200).send('Comentario añadido con éxito');
            }
            
        }
        
    } catch(error){
        res.status(500).send(error);
    }
}
/**
 * Json con la informacion requerida:
 * @param alias
 * @param correo
 */
exports.registrarUsuario = async (req, res) => {
    try{
        const {alias, correo} = req.body;
        const usuario = await Usuario.findOne({
            where:{
                correo
            }
        });
        if(usuario){
            res.status(200).send('El usuario ya existe');
        } else {
            await Usuario.create({
                alias,
                correo,
                activo: true
            });
            res.status(200).send('Usuario creado con éxito');
        }
    } catch(error){
        res.status(500).send(error);
    }
}
/**
 * Json con la informacion requerida:
 * @param nombre_etiqueta
 */
exports.crearEtiqueta = async (req, res) => {
    try{
        const {nombre_etiqueta} = req.body
        await Etiquetas.findOrCreate({
            where:{
                nombre_etiqueta
            },
            defaults:{
                nombre_etiqueta
            } 
        });
        res.status(200).send('Etiqueta creada con éxito');
    } catch(error){
        res.status(500).send(error);
    }
}

exports.anadirEtiquetaADistro = async (req, res) => {
    try{
        const {etiqueta_nombre} = req.body;
        const etiqueta = await Etiquetas.findOne({
            where:{
                nombre_etiqueta: etiqueta_nombre   
            }
        });
        if(!etiqueta){
            res.status(500).send('No existe la etiqueta');
        } else {
            const distribucion = await Distribucion.findOne({
                where:{
                    nombre_distribucion: req.params.nombreDistro
                }
            });
            if(!distribucion){
                res.status(500).send('No existe la distribución');
            } else {
                Distribucion_etiquetas.findOrCreate({
                    where:{
                        etiqueta_id: etiqueta.id_etiqueta,
                        distribucion_id: distribucion.id_distribucion
                    },
                    defaults:{
                        etiqueta_id: etiqueta.id_etiqueta,
                        distribucion_id: distribucion.id_distribucion,
                        votos: 1
                    }
                });
                res.status(200).send('Etiqueta añadida con éxito');
            }
        }
    } catch(error){
        res.status(500).send(error);
    }
}