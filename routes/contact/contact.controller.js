const mailService = require('../../services/mail.service');
require('dotenv').config();


module.exports = new class MailController {

    async sendMails(data) {
        try {
            const mailToUser = await mailService.sendMail(data.email, data);
            const mailToBack = await mailService.sendMail(process.env.MAIL_BACK, data);
        } catch (error) {
            throw error;
        }

        return { mailToUserId: mailToUser.messageId, mailToBackId: mailToBack.messageId };
    }

};