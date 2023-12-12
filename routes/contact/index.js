const express = require('express');
const router = express.Router();
const controller = require('./contact.controller');


router.post('', (req, res, next) => {
    controller.sendMails(req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((e) => res.status(500).send(e)); 
});



module.exports = {
    path: '/contact',
    router
};