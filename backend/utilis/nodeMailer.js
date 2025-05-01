const nodemailer = require("nodemailer");
const sendMail = async (to, subject,html) => {
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'sstockflow@gmail.com',
                pass:'wpfo qbnd wvbt xwhf'
            }
        })
        await transporter.sendMail({
            from:'Stockflow',
            to,
            subject,
            html,
        })
    } catch(error){
        console.log(error);
        return error;
    }
}
module.exports = sendMail;