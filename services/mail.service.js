const nodemailer = require('nodemailer');
require('dotenv').config();

class MailService{

    async sendMail (mailTo, data, file1=null, file2=null) {

        if(!data.name){
            data.name = `${data.firstname} ${data.lastname}`;
        }

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let mailOptions = {
            from: "test",
            to: mailTo,
            subject: 'Test Kontaktformular',
            html: `<h1>Hallo ${data.name}<h1>`,
            attachments: []
        };

        //Lebenslauf?
        if(file1) {
            mailOptions.attachments.push({   
                path: process.cwd() + "/files/" + file1
            });
        };

        if(file2) {
            mailOptions.attachments.push({   
                path: process.cwd() + "/files/" + file2
            });
        }

        let info = await transporter.sendMail(mailOptions);

        return info;
    }
}

module.exports = new MailService;