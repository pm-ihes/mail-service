const router = express.Router();
const fs = require('fs');
const path = require('path'); 
const multer = require('multer');

const upload = multer({ storage: storage });
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

let filenames = [];


router.post('/upload', upload.array('file', 2), (req, res) => {
    let data = req.body;

    mailService(data, filenames[0] || null, filenames[1] || null, (info) => {
        console.log(`the mail has been send and the id is ${info.messageId}`);
        res.status(200).send(info);

        deleteFiles(filenames);

        filenames = [];
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);

        deleteFiles(filenames);

        filenames = [];
    });
});


//Hochgeladene Dateien löschen
function deleteFiles(filenames){
    filenames.forEach(filename => {
        fs.unlink(`${__dirname}/../files/${filename}`, (err) => {
            if (err) {
                console.log(`Fehler beim Löschen der Datei: ${filename}`);
                console.log(err);
            } else {
                console.log(`${filename} erfolgreich gelöscht`);
            }
        });
    });
}


module.exports = router;