
require('dotenv').config();

/*module.exports = new class ApplicationController{
    filenames = [];

    async mailService(data, filenames[0] || null, filenames[1] || null, (info) => {
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

}*/