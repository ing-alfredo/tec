const nodemailer = require("nodemailer");


class Email {

    constructor(oConfig) {
        this.createTransport = nodemailer.createTransport(oConfig);
    }

    enviarCorreo(oEmail) {
        try {
            let _this = this;   
            this.createTransport.sendMail(oEmail, function (error, info) {
                if (error) {
                    console.log("Error al enviar email");
                } else {
                    console.log("Correo enviado correctamente");
                }
                _this.createTransport.close();
            });
        } catch (x) {
            console.log("Email.enviarCorreo -- Error-- " + x);
        }
    }
}
module.exports = Email;