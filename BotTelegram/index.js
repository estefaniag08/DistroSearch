const TelegramBot = require('node-telegram-bot-api');

const token = '1087872968:AAH2OovRAsSbRfZAHgLHkp1kDirkv3hLVrw';

const GnuBot = new TelegramBot(token, {
    polling: true
});

GnuBot.onText(/^\/start/, function(msg){
    // Imprimimos en consola el mensaje recibido.
    console.log(msg);
    // msg.chat.id se encarga de recoger el id del chat donde se está realizando la petición.
    var chatId = msg.chat.id;
    // msg.from.username se encarga de recoger el @alias del usuario.
    var username = msg.from.username;
    // Enviamos un mensaje indicando el id del chat, y concatenamos el nombre del usuario con nuestro saludo
    GnuBot.sendMessage(chatId, "Hola Tefa, son Ñu");
  });
