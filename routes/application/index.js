const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'); 
const multer = require('multer');

const ApplicationController = require('./application.controller')
const controller = new ApplicationController();

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
});

const upload = multer({ storage: storage });

let filenames = [];


router.post('', upload.array('file', 2), (req, res) => {
    let data = req.body;

    controller.sendMails(data, filenames[0] || null, filenames[1] || null)
        .then((result) => {
            res.status(200).send(result);
            deleteFiles(filenames);
            filenames  = [];
        })
        .catch((e) => {
            res.status(400).send(e);
            deleteFiles(filenames);
            filenames  = [];
        });
});


//Hochgeladene Dateien löschen
function deleteFiles(filenames){
    filenames.forEach(filename => {
        fs.unlink(`${__dirname}/../../files/${filename}`, (err) => {
            if (err) {
                console.log(`Fehler beim Löschen der Datei: ${filename}`);
                console.log(err);
            } else {
                console.log(`${filename} erfolgreich gelöscht`);
            }
        });
    });
}


module.exports = {
    path: '/application',
    router
};