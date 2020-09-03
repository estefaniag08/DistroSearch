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