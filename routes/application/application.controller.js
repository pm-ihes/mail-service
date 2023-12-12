
const mailService = require('../../services/mail.service');
require('dotenv').config();

module.exports = class ApplicationController {

    async sendMails(data, filename1 = undefined, filename2 = undefined) {
        try {
            const mailToUser = await mailService.sendMail(data.email, data);
            const mailToBack = await mailService.sendMail(process.env.MAIL_BACK, data, filename1, filename2);

            return { mailToUserId: mailToUser.messageId, mailToBackId: mailToBack.messageId };

        } catch (error) {
            throw error;
        }
    }
}