require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTBOTEMAIL,
    pass: process.env.NOTBOTPASSWORD,
  },
});

const sendInvite = email => {
  const invite = {
    from: '"NotBot Admin" <behumannotbot@gmail.com>', 
    to: email, 
    cc: 'behumannotbot@gmail.com', 
    subject: 'beHuman Admin Invite', 
    text: 'admin invite link.', 
    html: `Use this <a href="https://be-human-demo.herokuapp.com">Invite Link</a> to access the admin page. You will need to use the password: ${process.env.EMAILPASSWORD} and this email to login.`,
  };

  return transporter.sendMail(invite);
};

module.exports = sendInvite;
