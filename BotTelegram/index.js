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

    axios.get(url + `/`).then((respuesta) => {
        GnuBot.sendMessage(chatId, respuesta.data);
    })
});

GnuBot.onText(/\/distro/, (msg, match) => {
    const chatId = msg.chat.id;
    const arg = match.input.split(' '); 
    if (arg[1] === undefined){
        axios.get(url + `/distribuciones`).then((respuesta) => {
            let nombreDistro = "";
            respuesta.data.forEach(element => {
                nombreDistro += element.nombre_distribucion+"\n";
            });
            GnuBot.sendMessage(chatId, "Distribuciones: "+nombreDistro);
        }).catch( () => GnuBot.sendMessage(chatId, "No se encontró la distribución :("));
        return;
    }
    else{

        //Si no tiene bandera, el argumento es el nombre de la distribucion
        if (arg[2] === undefined) {
            //Peticion GET con toda la información de la distribución
            axios.get(url + `/distribuciones/${arg[1]}`).then((respuesta) => {
                GnuBot.sendMessage(chatId, "Distribucion: "+respuesta.data.nombre_distribucion);
            }).catch( () => GnuBot.sendMessage(chatId, "No se encontró la distribución :("))    
            return;
        }
        else{
            if (arg[1] === '-g') { // -g referente a información general
                axios.get(url + `/distribuciones/info-general/${arg[2]}`).then((respuesta) => {
                    GnuBot.sendMessage(chatId, "Distribucion: " + respuesta.data.Informacion_general.nombre_descripcion);
                }).catch( () => GnuBot.sendMessage(chatId, "No se encontró la distribución :("))    
                return;
            }
            else if(arg[1] === '-t'){ //-t referente a infromación técnica
                axios.get(url + `/distribuciones/info-tecnica/${arg[2]}`).then((respuesta) => {
                    GnuBot.sendMessage(chatId, "Distribucion: " + respuesta.data.Informacion_tecnica.arquitectura);
                }).catch( () => GnuBot.sendMessage(chatId, "No se encontró la distribución :("))    
                return;
            }
            else if(arg[1] === '-d'){ //-d referente a información de la documentación
                axios.get(url + `/distribuciones/info-documentacion/${arg[2]}`).then((respuesta) => {
                    GnuBot.sendMessage(chatId, "Distribucion: " + respuesta.data.informacion_documentacion.url_distribucion);
                }).catch( () => GnuBot.sendMessage(chatId, "No se encontró la distribución :("))    
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
                    let nombreDistro = "Comentarios\n";
                    respuesta.data.distribucion_comentarios.forEach(element => {
                        nombreDistro += "Usuario: "+element.comentario.usuario.alias+" Comentario: "+element.comentario.texto_comentario+"\n";
                    });
                    GnuBot.sendMessage(chatId, nombreDistro);
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
    //  /etiqueta -e TefaMint
    //  /etiqueta -d etiqueta
    const chatId = msg.chat.id;
    const arg = match.input.split(' '); 
    if (arg[1] === undefined || arg[2] === undefined){
        GnuBot.sendMessage(chatId, "El comando esta incompleto Ñuuuu");
    }
    else{
        if (arg[1] === '-e') {
            axios.get(url + `/distribuciones/${arg[2]}/etiquetas`).then((respuesta) => {                
                let nombreEtiquetas = "Etiquetas";
                respuesta.data.distribucion_etiquetas.forEach(element => {
                    nombreEtiquetas += "\n"+element.etiqueta.nombre_etiqueta;
                });
                nombreEtiquetas = respuesta.data.distribucion_etiquetas.length == 0 ? "La distribución no tiene etiquetas":nombreEtiquetas;
                GnuBot.sendMessage(chatId, nombreEtiquetas);
            }).catch( () => GnuBot.sendMessage(chatId, "Ups ñuuuu :("))    
            return;
        } 
        else if(arg[1] === '-d') {
            axios.get(url + `/distribuciones/etiquetas/votos/${arg[2]}`).then((respuesta) => {
                let nombreDistros = "Distribuciones";
                respuesta.data.distribucion_etiquetas.forEach(element => {
                    nombreDistros += "\n"+element.distribucion.nombre_distribucion;
                });
                nombreDistros = respuesta.data.distribucion_etiquetas.length == 0 ? "No existen etiquetas para esta distribución":nombreDistros;
                GnuBot.sendMessage(chatId, nombreDistros);               
            }).catch( () => GnuBot.sendMessage(chatId, "Ups ñuuuu :("))    
            return;
        }
        else {
            GnuBot.sendMessage(chatId, "No encuentro ese comando, Ñuuuuuu >:(");
        }

    }
})

/*
GnuBot.onText(/^\/botones/, function(msg){
    var chatId = msg.chat.id;
    var botones = {
        reply_markup:{
            inline_keyborad:[
                [
                    {text: "Botón 1", callback_data: 'boton1'},
                    {text: "Botón 2", callback_data: 'boton2'}
                ]
            ]
        }
    }
    GnuBot.sendMessage(chatId, "Botoneeeeeeeeeeeees", botones);
    GnuBot.on('callback_query', function onCallbackQuery(accionboton){
        const data = accionboton.data
        const msg = accionboton.message

        if(data == 'boton1'){
            GnuBot.sendMessage(chatId, "Acción botón 1");
        }
        if(data == 'boton2'){
            GnuBot.sendMessage(chatId, "Acción botón 2");
        }
    })
})*/