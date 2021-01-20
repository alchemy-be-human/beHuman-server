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

// invite email 
const invite = {
  from: '"NotBot Admin" <behumannotbot@gmail.com>', // sender address
  to: 'bryanakitchen@gmail.com, francopdx@gmail.com, jillian.l.gibson@gmail.com, shaneupchurch@gmail.com, fernandclay@gmail.com',  // list of receivers
  cc: 'behumannotbot@gmail.com',
  subject: 'test email', // Subject line
  text: 'this is a test of the admin invite link.', // plain text body
  html: '<a href="http://api/v1/auth/invite">Invite Link</a>', // html body
};

// send mail with defined transport object
transporter.sendMail(invite, (err, data) => {
  if(err) {
    console.log('Error Occurred.', err);
  } else {
    console.log('Invite sent.');
  }
});
