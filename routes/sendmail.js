const express = require('express');
const router = express.Router();
const mailService = require('../services/mail.service');


router.post('/sendmail', (req, res) => {
    console.log('request came');
    let data = req.body;

    res.send({ message: 'Gut' })
    sendMail(data);
});

function sendMail(data) {
    mailService(data, info => {
        console.log(`the mail has been send and the id is ${info.messageId}`);
        res.send(info);
    });
}

module.exports = router;