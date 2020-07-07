const nodemailer = require('nodemailer');


let mail = async () =>{

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "sg3plvcpnl314452.prod.sin3.secureserver.net",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: 'support@triunionhealthcare.com', // generated ethereal user
        pass: '*Support123!', // generated ethereal password
        },
    });


    
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@hospicefusion.com>', // sender address
        to: "hsouleater@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });


    return info.messageId;
};


module.exports = mail;