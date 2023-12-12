const mailService = require('../../services/mail.service');
require('dotenv').config();


module.exports = new class MailController {

    async sendMails(data) {
        const mailToUser = await mailService.sendMail(data.email, data);
        const mailToBack = await mailService.sendMail(process.env.MAIL_BACK, data);

        return { mailToUser, mailToBack };
    }

};