import nodemailer from 'nodemailer'


const sendEmails = async (email, subject, body) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Learnix" <${process.env.USER_EMAIL}>`,
            to: email,
            subject: subject,
            html: body
        }

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');

        return true

    } catch (error) {
        throw new Error(`Email sending failed: ${error.message}`);
    }
}

export default sendEmails;


