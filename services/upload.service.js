const fs = require('fs');
const path = require('path'); 
const multer = require('multer');

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

function fileUpload(req, res) {
    upload.array('file', 2)
}

module.exports = fileUpload;