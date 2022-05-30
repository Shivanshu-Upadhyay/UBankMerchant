const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require("path");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'rampraveshsingh1996@gmail.com',
        pass: 'PpppP12345'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views', relativePath),
        data,
        function(err, template){
            if(err) {console.log('error in rendering template',err); return;}

            mailHTML = template;    
        }
    )
    return mailHTML;
}




module.exports.mail = (url,email) =>{

    let htmlString = renderTemplate({url: url}, 'email.ejs'); 
    transporter.sendMail({
        
        from: 'rampraveshsingh1996@gmail.com',
        to: email,
        subject: "Checking that email is sending or not",
        html: htmlString

    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    })
}