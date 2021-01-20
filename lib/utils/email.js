const nodemailer = require('nodemailer');

// create reusable transporter object using gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // NotBot Admin gmail
    pass: '', // NotBot Admin gmail password
  },
});

// email invite outline
const invite = {
  from: '"NotBot Admin" <behumannotbot@gmail.com>', // sender address
  to: 'jlg626@icloud.com', // list of receivers
  subject: 'test email', // Subject line
  text: 'this is a test of the admin invite link.', // plain text body
  html: '<a href="http://api/v1/auth/invite>Invite Link</a>', // html body
};

// send mail with defined transport object
transporter.sendMail(invite, (err, data) => {
  if(err) {
    console.log('Error Occurred');
  } else {
    console.log('Invite sent.');
  }
});