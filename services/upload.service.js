const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files')
    },
    filename: (req, file, cb) => {
        cb(null, 'Test' + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});


const handeUpload = function(req, res){

    if(req.file){
        upload.single("file");
        console.log("Vorhanden");
    }


}

module.exports = handeUpload;