const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        // let testAccount = await nodemailer.createTestAccount();
    console.log(process.env.USER,
        process.env.PASS)

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'Gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;