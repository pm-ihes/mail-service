const express = require('express');
const router = express.Router();
const controller = require('./contact.controller');


router.post('', (req, res, next) => {
    controller.sendMails(req.body)
        .then((result) => {
            res.status(200);
        })
        .catch((e) => next(e)) 
});



module.exports = {
    path: '/contact',
    router
};