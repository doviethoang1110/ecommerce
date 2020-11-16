const nodemailer = require('nodemailer');
const {mailer} = require('../config/configuration');
const { mailVerify } = require('../helpers');

const transporter =  nodemailer.createTransport({
    host: mailer.host,
    port: mailer.port,
    secure: true,
    auth: {
        user: mailer.name,
        pass: mailer.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mainOptions = {
    from: 'multi-cart-shop',
    to: '',
    subject: 'Verify your email',
    text: 'Xác thực email',
    html: ''
}


module.exports.sendMail = async (options) => {
    const customOptions = {...mainOptions,...options};
    transporter.sendMail(customOptions, (err, info) => {
        if (err) console.log(err);
        else console.log('Message sent: ' +  info.response);
    });
}