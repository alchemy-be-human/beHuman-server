require('dotenv').config();
const nodemailer = require('nodemailer');

// create reusable transporter object using gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTBOTEMAIL, // NotBot Admin gmail
    pass: process.env.NOTBOTPASSWORD, // NotBot Admin gmail password
  },
});
const sendInvite = email => {
// invite email 
  const invite = {
    from: '"NotBot Admin" <behumannotbot@gmail.com>', // sender address
    to: email,  // list of receivers
    cc: 'behumannotbot@gmail.com', 
    subject: 'beHuman Admin Invite', // Subject line
    text: 'admin invite link.', // plain text body
    html: 'Use this <a href="https://be-human-demo-staging.herokuapp.com">Invite Link</a> to access the admin page. You will need to use the password: adminPassword and this email to login.', // html body
  };

  // send mail with defined transport object
  return transporter.sendMail(invite);
};




module.exports = sendInvite;
