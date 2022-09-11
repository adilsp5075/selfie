require('dotenv').config();
const nm = require("nodemailer");

class Mailer {
    constructor() {
        this.user = process.env.SN_MAIL;
        this.pass = process.env.SN_PASSWD;
        this.service = "SendinBlue";
        this.transporter = nm.createTransport({
            service: this.service,
            auth: {
                user: this.user,
                pass: this.pass,
            }
        })
    }

    // interface sndConfig={
    // from:String,
    // to:String,
    // subject:String,
    // text:String
    // }

    async sendMail(sndConfig) {
        const sndMail = {
            ...sndConfig
        }
        return await this.transporter.sendMail(sndMail)
    }
}
module.exports = { Mailer }