'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');
// 创建transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '915153147@qq.com', // generated ethereal user
    pass: 'qhcakidpntafbbaf', // generated ethereal password
    // pass: 'wlyisking1010',
  },
});

class EmailService extends Service {

  async send(data) {
    // setup email data with unicode symbols
    const mailOptions = {
      from: '915153147@qq.com', // sender address
      to: 'wlyisking@2980.com', // list of receivers
      subject: '王力宇的博客的验证码', // Subject line
      // text: '尊敬的' + data.name, // plain text body
      html: '<b>您的验证码是: <h1>' + data + '</h1></b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    return;
  }

}

module.exports = EmailService;

