const express = require('express');
const router = express.Router();
const multer = require('multer');
const mailService = require('../services/mail.service');
const fs = require('fs');

let filenames = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.mimetype.split("/")[1];
        const filename = file.fieldname + '-' + uniqueSuffix + "." + ext;
        cb(null, filename);
        console.log(`Hochgeladen: ${filename}`);
        filenames.push(filename);
    }
})

const upload = multer({ storage: storage });

router.post('/sendmail', (req, res) => {
    console.log('request came');
    let data = req.body;

    res.send({ message: 'Gut' })
    //sendMail(data);
});

router.post('/upload', upload.array('file', 2), (req, res) => {
    let data = req.body;
    mailService(data, filenames[0] || null, filenames[1] || null)
        .then(info => {
            console.log(`the mail has been send and the id is ${info.messageId}`);
            res.status(200).send(info);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    
    filenames.forEach(filename => {
        fs.unlink(`${process.cwd}/files/${filename}`, (err) => {
            if (err) {
                console.log(`Fehler beim Löschen der Datei: ${filename}`);
            } else {
                console.log(`${filename} erfolgreich gelöscht`);
            }
        });
    });

    filenames = [];
});

function sendMail(data) {
    mailService(data, info => {
        console.log(`the mail has been send and the id is ${info.messageId}`);
        res.send(info);
    });
}

module.exports = router;