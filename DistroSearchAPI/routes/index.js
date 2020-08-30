const express = require('express');
const router = express.Router();

module.exports = function(){
    router.get('/', (req, res, next) => {
        res.json('Ok');
    });
    return router;
}