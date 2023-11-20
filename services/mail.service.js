const nodemailer = require('nodemailer');

const sendMail = async function (data, file1=null, file2=null, callback) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mislerpa01@gmail.com',
            pass: 'pvjh grim ojxh dgzv'
        }
    });

    let mailOptions = {
        from: "test",
        to: data.email,
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

    callback(info);

}

module.exports = sendMail;