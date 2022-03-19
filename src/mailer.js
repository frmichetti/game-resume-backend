const nodemailer = require("nodemailer");

(async () => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS
        }
    });

    const mailOptions = {
        from: '"Felipe R M" <ahfeeeh@gmail.com>', // sender address
        to: "frmichetti@gmail.com", // list of receivers
        subject: "Node Mailer", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

})();

