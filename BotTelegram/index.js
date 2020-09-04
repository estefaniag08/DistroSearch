const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');


//Token generado por Telegram para poder usar el bot
const token = '1087872968:AAH2OovRAsSbRfZAHgLHkp1kDirkv3hLVrw';
//Url del API a utilizar
const url = 'http://localhost:5000';

const GnuBot = new TelegramBot(token, {
    polling: true
});

GnuBot.onText(/^\/start/, function(msg){

    // msg.chat.id se encarga de recoger el id del chat donde se está realizando la petición.
    var chatId = msg.chat.id;
    let hola = `. 
                  ,                        ,       
                /                          \\      
                ( (__-^^-,-^^-__) )
                    '--_---'   '---_--'
                    '--|©'  '©|--'     
                         \\    '     /
                           ):     :(     
                            :º_º:    
                              "-"       
×º°”˜'”°º×( Bienvenido )×º°”˜'”°º× 
    Hola, soy Ñu. Soy tu bot y te
 ayudaré a conocer un poco mas
    sobre las distribuciones del
   sistema operativo GNU/Linux.
      Puedes utilizar el siguiente 
comando /gnu para que aprendas
    como comunicarte conmigo.
    `;
    axios.get(url + `/`).then((respuesta) => {
        GnuBot.sendMessage(chatId, hola);
    })
});

GnuBot.onText(/^\/gnu/, function(msg){
    const chatId = msg.chat.id;
    const comandos = `<b><i>Para comunicarte conmigo puedes utilizar la siguiente lista de comandos Ñuuuu</i></b>\n
    /distro -> Te envío la lista de distribuciones que tengo almacenadas.
    /distro <i>nombre</i> -> Te envío la información de una sola distribución, en donde <i>nombre</i> es la distribución que deseas buscar.
    /distro -g <i>nombre</i> -> Te envío la información general de una sola distribución, en donde <i>nombre</i> es la distribución que deseas buscar.
    /distro -t <i>nombre</i> -> Te envío la información técnica de una sola distribución, en donde <i>nombre</i> es la distribución que deseas buscar.
    /distro -d <i>nombre</i> -> Te envío la información de la documentación de una sola distribución, en donde <i>nombre</i> es la distribución que deseas buscar.\n
    /comentario <i>nombre</i> -> Te envío los comentarios que se hayan realizado sobre una distribución, en donde <i>nombre</i> es la distribución que deseas buscar.
    /comentario <i>correo nombre comentario</i> -> Te permito insertar un comentario en una distribución, en donde <i>correo</i> es el correo con el que te ecuentras registrado,
    <i>nombre</i> es la distribución y <i>comentario</i> es lo que quieras mencionar de la distribución y debe ir dentro de comillas ("") (recuerda ser respetuoso Ñuuuu).\n
    /etiqueta -> Te muestra las etiquetas disponibles en DistroSearch.
    /etiqueta -e <i>nombre</i> -> Te muestro las etiquetas que posee una distribución, en donde <i>nombre</i> es la distribución que deseas buscar.
    /etiqueta -d <i>etiqueta</i> -> Te muestro las distribuciones que posean una etiqueta, en donde <i>etiqueta</i> es el nombre de la etiqueta que deseas buscar.
    /etiqueta -v <i>nombre etiqueta</i> -> Te permito votar por una etiqueta en una distribución, en donde <i>nombre</i> es la distribución y <i>etiqueta</i> es el nombre de la etiqueta que deseas votar.
    /etiqueta -a <i>nombre etiqueta</i> -> Te permito añadir una etiqueta a una distribución, en donde <i>nombre</i> es la distribución y <i>etiqueta</i> es el nombre de la etiqueta que deseas votar.\n
    /hijos <i>nombre</i> -> Te muestro las hijas de una distribución, en donde <i>nombre</i> es la distribución que deseas buscar.\n
    /usuario <i>alias correo</i> -> Te creo un usuario para que puedas hacer comentarios en las distribuciones, en donde <i>alias</i> seria tu pseudónimo en DistroSearch y <i>correo</i> sera tu correo personal.
    /creditos -> Aquí puedes conocer a los desarrolladores de DistroSearch :) Ñuuuuuu
    `;

    GnuBot.sendMessage(chatId, comandos, {parse_mode: 'HTML'});

})

GnuBot.onText(/\/distro/, (msg, match) => {
    const chatId = msg.chat.id;
    const arg = match.input.split(' '); 
    
    if (arg[1] === undefined){
        axios.get(url + `/distribuciones`).then((respuesta) => {
            let nombreDistro = `<b>Distribuciones:\n</b>`;
            respuesta.data.forEach(element => {
                nombreDistro += `<code>${element.id_distribucion}. ${element.nombre_distribucion}\n</code>`;
            });
            GnuBot.sendMessage(chatId, nombreDistro, {parse_mode: 'HTML'});
        }).catch( () => GnuBot.sendMessage(chatId, "No se encontró la distribución :("));
        return;
    }
    else{

        //Si no tiene bandera, el argumento es el nombre de la distribucion
        if (arg[2] === undefined) {
            //Peticion GET con toda la información de la distribución
            
            axios.get(url + `/distribuciones/${arg[1]}`).then((respuesta) => {
                let informacion = `<b>Distribución ${respuesta.data.nombre_distribucion}\n</b>`
                                    +`\t<i>Última versión:</i> ${respuesta.data.fecha_ultima_version}\n`
                                    +`\t<i>Familia:</i> ${respuesta.data.familia === undefined ? 'Ninguno' : respuesta.data.familia}\n`
                                    +`\t<i>Licencia:</i> ${respuesta.data.licencia}\n\n`
                                    +`<b><i>Información general\n</i> </b>`
                                    +`\t<i>Descripción:</i> ${respuesta.data.informacion_general.descripcion}\n`
                                    +`\t<i>Estado:</i> ${respuesta.data.informacion_general.estado===true ? 'Activo': 'Inactivo'}\n`
                                    +`\t<i>Categoría: </i>${respuesta.data.informacion_general.categoria}\n`
                                    +`\t<i>Origen:</i> ${respuesta.data.informacion_general.origen}\n`
                                    +`\t<i>Idiomas:</i> ${respuesta.data.informacion_general.idiomas}\n`
                                    +`\t<i>Requerimientos:</i> ${respuesta.data.informacion_general.requerimientos}\n`
                                    +`\t<i>Historia:</i> ${respuesta.data.informacion_general.historia}\n\n`
                                    +`<b><i>Información técnica\n</i></b>`
                                    +`\t<i>Arquitectura:</i> ${respuesta.data.Informacion_tecnica.arquitectura}\n`
                                    +`\t<i>Interfaz gráfica:</i> ${respuesta.data.Informacion_tecnica.interfaz_grafica}\n`
                                    +`\t<i>Gestor de paquetes:</i> ${respuesta.data.Informacion_tecnica.sistema_gestion_paquetes}\n`
                                    +`\t<i>Método de actualización:</i> ${respuesta.data.Informacion_tecnica.metodo_actualizacion}\n`
                                    +`\t<i>Versiones:</i> ${respuesta.data.Informacion_tecnica.versiones}\n\n`
                                    +`<b><i>Información documentación\n</i></b>`
                                    +`\t<i>Página web:</i> <a href='${respuesta.data.informacion_documentacion.url_distribucion}'> ${respuesta.data.nombre_distribucion} </a>\n`
                                    +`\t<i>Documentación:</i><a href='${respuesta.data.informacion_documentacion.url_documentacion}'> Enlace </a>\n`
                                    +`\t<i>Descargas:</i> <a href='${respuesta.data.informacion_documentacion.url_instalacion}'> ${respuesta.data.nombre_distribucion} </a>\n`

                GnuBot.sendMessage(chatId, informacion, {parse_mode: 'HTML'});

            }).catch( () => GnuBot.sendMessage(chatId, "No encontré la distribución, Ñuuuuuuu :("))    
            return;
        }
        else{
            if (arg[1] === '-g') { // -g referente a información general
                axios.get(url + `/distribuciones/info-general/${arg[2]}`).then((respuesta) => {
                    let infoGeneral = `<b>Informacion General:\n\n</b>`
                                    +`\t<i>Descripción:</i> ${respuesta.data.informacion_general.descripcion}\n`
                                    +`\t<i>Estado:</i> ${respuesta.data.informacion_general.estado ===true ? 'Activo': 'Inactivo'}\n`
                                    +`\t<i>Categoría:</i> ${respuesta.data.informacion_general.categoria}\n`
                                    +`\t<i>Origen:</i> ${respuesta.data.informacion_general.origen}\n`
                                    +`\t<i>Idiomas:</i> ${respuesta.data.informacion_general.idiomas}\n`
                                    +`\t<i>Requerimientos:</i> ${respuesta.data.informacion_general.requerimientos}\n`
                                    +`\t<i>Historia:</i> ${respuesta.data.informacion_general.historia}`
                    GnuBot.sendMessage(chatId, infoGeneral, {parse_mode: 'HTML'});
                }).catch( () => GnuBot.sendMessage(chatId, "No encontré la distribución, Ñuuuuuuu :("))    
                return;
            }
            else if(arg[1] === '-t'){ //-t referente a infromación técnica
                axios.get(url + `/distribuciones/info-tecnica/${arg[2]}`).then((respuesta) => {
                    let infoTecnica = `<b>Informacion Técnica:\n\n</b>`
                                    +`\t<i>Arquitectura:</i> ${respuesta.data.Informacion_tecnica.arquitectura}\n`
                                    +`\t<i>Interfaz gráfica:</i> ${respuesta.data.Informacion_tecnica.interfaz_grafica}\n`
                                    +`\t<i>Gestor de paquetes:</i> ${respuesta.data.Informacion_tecnica.sistema_gestion_paquetes}\n`
                                    +`\t<i>Método de actualización:</i> ${respuesta.data.Informacion_tecnica.metodo_actualizacion}\n`
                                    +`\t<i>Versiones:</i> ${respuesta.data.Informacion_tecnica.versiones}\n`
                    GnuBot.sendMessage(chatId, infoTecnica, {parse_mode: 'HTML'});
                }).catch( () => GnuBot.sendMessage(chatId, "No encontré la distribución, Ñuuuuuuu :("))    
                return;
            }
            else if(arg[1] === '-d'){ //-d referente a información de la documentación
                axios.get(url + `/distribuciones/info-documentacion/${arg[2]}`).then((respuesta) => {
                    let infoDocu = `<b>Documentación:\n\n</b>`
                                    +`\t<i>Página web:</i> <a href='${respuesta.data.informacion_documentacion.url_distribucion}'> ${respuesta.data.nombre_distribucion} </a>\n`
                                    +`\t<i>Documentación:</i><a href='${respuesta.data.informacion_documentacion.url_documentacion}'> Enlace </a>\n`
                                    +`\t<i>Descargas:</i> <a href='${respuesta.data.informacion_documentacion.url_instalacion}'> ${respuesta.data.nombre_distribucion} </a>\n`

                    GnuBot.sendMessage(chatId, infoDocu, {parse_mode: 'HTML'});
                }).catch( () => GnuBot.sendMessage(chatId, "No encontré la distribución, Ñuuuuuuu :("))    
                return;
            }
            else{
                GnuBot.sendMessage(chatId, "No encuentro ese comando, Ñuuuuuu >:(");
            }
        }
    }
})

GnuBot.onText(/\/comentario/, (msg, match) => {
    // /comentario TefaMInt
    // /comentario dd@correo.com TefaMInt "texto que puede ser largo"
    const chatId = msg.chat.id;
    const arg = match.input.split('"');
    const text = arg[1];
    const data = arg[0].split(' ');

    if (data[1] !== undefined){
        if (data[2] === undefined) {
            axios.get(url + `/distribuciones/${data[1]}/comentarios`).then((respuesta) => {
                if (respuesta.data === null) {
                    GnuBot.sendMessage(chatId, "No se encontro la distribución Ñuuuuu");
                    return;
                }
                else if(respuesta.data.distribucion_comentarios.length != 0){
                    let nombreDistro = `<b>Comentarios</b>\n`;
                    respuesta.data.distribucion_comentarios.forEach(element => {
                        nombreDistro += `\t<i>Usuario: </i> ${element.comentario.usuario.alias} \n\t<i>Comentario: </i> ${element.comentario.texto_comentario}\n`
                    });
                    GnuBot.sendMessage(chatId, nombreDistro, {parse_mode: 'HTML'});
                    return;
                }
                else{
                    GnuBot.sendMessage(chatId, "No hay comentarios de la distribución");
                    return;
                }
            })
            return;
        } else {
            if (text === undefined) {
                GnuBot.sendMessage(chatId, "Falta ingresar un comentario");
                return;
            } else {
                axios.post(url + `/distribuciones/${data[2]}/comentarios`, {                  
                        'correo': data[1],
                        'comentario': text
                }).then((respuesta) => {
                    GnuBot.sendMessage(chatId, respuesta.data);
                }).catch( (error) => 
                    GnuBot.sendMessage(chatId, error.response.data)
                );
                return;
            }
        }
    }
    else{
        GnuBot.sendMessage(chatId, "No encuentro ese comando, Ñuuuuuu >:(");
    }
})

GnuBot.onText(/\/etiqueta/, (msg, match) => {
    //  /etiqueta -e TefaMint Etiquetas por una distribución
    //  /etiqueta -d etiqueta Distribuciones por una etiqueta
    //  /etiqueta -v TefaMint etiqueta Votar por una etiqueta en la distribución
    //  /etiqueta -a TefaMint etiqueta añade una etiqueta a una distribucion

    const chatId = msg.chat.id;
    const arg = match.input.split(' '); 
    if (arg[1] === undefined){
        axios.get(url + `/etiquetas`).then((respuesta) => {
            let nombreEtiqueta = `<b>Etiquetas disponibles:\n</b>`;
            respuesta.data.forEach(element => {
                nombreEtiqueta += `<code>${element.nombre_etiqueta}\n</code>`;
            });
            GnuBot.sendMessage(chatId, nombreEtiqueta, {parse_mode: 'HTML'});
        }).catch( () => GnuBot.sendMessage(chatId, "No se encontraron etiquetas :("));
        return;
    }
    else{
        if (arg[1] === '-e') {
            axios.get(url + `/distribuciones/${arg[2]}/etiquetas`).then((respuesta) => {                
                let nombreEtiquetas = `<b>Etiquetas para ${respuesta.data.nombre_distribucion}</b>\n`;
                respuesta.data.distribucion_etiquetas.forEach(element => {
                    nombreEtiquetas += `<code>${element.etiqueta.nombre_etiqueta} : ${element.votos} votos \n</code>`;
                });
                nombreEtiquetas = respuesta.data.distribucion_etiquetas.length == 0 ? "La distribución no tiene etiquetas":nombreEtiquetas;
                GnuBot.sendMessage(chatId, nombreEtiquetas, {parse_mode: 'HTML'});
            }).catch( () => GnuBot.sendMessage(chatId, "Ups ñuuuu :("))    
            return;
        } 
        else if(arg[1] === '-d') {
            axios.get(url + `/distribuciones/etiquetas/votos/${arg[2]}`).then((respuesta) => {
                let nombreDistros = `<b>Distribuciones con la etiqueta ${arg[2]}</b>\n`;
                respuesta.data.distribucion_etiquetas.forEach(element => {
                    nombreDistros += `\t ${element.distribucion.nombre_distribucion}\n`;
                });
                nombreDistros = respuesta.data.distribucion_etiquetas.length == 0 ? "No existen etiquetas para esta distribución":nombreDistros;
                GnuBot.sendMessage(chatId, nombreDistros, {parse_mode: 'HTML'});               
            }).catch( () => GnuBot.sendMessage(chatId, "Ups ñuuuu :("))    
            return;
        }
        else if(arg[1] === '-v'){
            if(arg[3] === undefined){
                GnuBot.sendMessage(chatId, "El comando esta incompleto Ñuuuu");
                return;
            } else {
                axios.put(url + `/distribuciones/${arg[2]}/etiquetas`,{
                    nombre_etiqueta: arg[3]
                }).then( respuesta => {
                    GnuBot.sendMessage(chatId, respuesta.data);
                }).catch(error=> {
                    GnuBot.sendMessage(chatId, error.response.data);
                })
            }
        }
        else if(arg[1] === '-a'){
            if(arg[3] === undefined){
                GnuBot.sendMessage(chatId, "El comando esta incompleto Ñuuuu");
                return;
            } else {
                axios.post(url + `/distribuciones/${arg[2]}/etiquetas`,{
                    etiqueta_nombre : arg[3]
                }).then( respuesta => {
                    GnuBot.sendMessage(chatId, respuesta.data);
                }).catch(error => {
                    GnuBot.sendMessage(chatId, error.response.data);
                })
            }
        }
        else {
            GnuBot.sendMessage(chatId, "No encuentro ese comando, Ñuuuuuu >:(");
        }

    }
})
// /hijos TefaMint
GnuBot.onText(/\/hijos/, (msg, match) => {
    const chatId = msg.chat.id;
    const arg = match.input.split(' ');
    if(arg[1] === undefined){
        GnuBot.sendMessage(chatId, "El comando esta incompleto Ñuuuu");
    } else {
        
        axios.get(url + `/distribuciones/${arg[1]}/nodos`)
            .then( respuesta => {
                let hijos = `<b> Distribuciones hijas de ${respuesta.data.nombre_distribucion}</b>\n`;
                respuesta.data.hijos.forEach( hijo => {
                    hijos += `<code>${hijo.nombre_distribucion}</code>\n`
                })
                hijos +=  ``
                GnuBot.sendMessage(chatId, hijos, {parse_mode: 'HTML'}); //Falta formatear el array
            }).chat(error => {
                GnuBot.sendMessage(chatId, error.response.data, {parse_mode: 'HTML'});
            })
    }
});
// /usuario alias correo
GnuBot.onText(/\/usuario/, (msg, match) => {
    const chatId = msg.chat.id;
    const arg = match.input.split(' ');
    if(arg[1] === undefined || arg[2] === undefined ){
        GnuBot.sendMessage(chatId, "El comando esta incompleto Ñuuuu");
    } else {
        axios.post(url + `/usuarios`,{
            alias: arg[1],
            correo: arg[2]
        }).then( respuesta => {
            GnuBot.sendMessage(chatId, respuesta.data);
        }).catch( error => {
            GnuBot.sendMessage(chatId, error.response.data);
        });
    }
});

GnuBot.onText(/\/creditos/, (msg, match) => {
    const chatId = msg.chat.id;
    let creditos = `<b>Trabajo realizado para el GLUD de la Universidad Distrital Francisco José de Caldas</b>\n
            Integrantes:\n
            (╯°□°)╯︵ ┻━┻ ︵ ╯(°□° ╯)\n
            <i>Estefania Garcia - 20161020017</i>
            <i>Diego Guerra - 20152020024</i>`
    GnuBot.sendMessage(chatId, creditos, {parse_mode: 'HTML'});
});
/*
GnuBot.on('message', msg => {
    const chatId = msg.chat.id;
    GnuBot.sendMessage(chatId, "Ola bb ");
})
*/