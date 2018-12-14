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
    // pass: 'qhcakidpntafbbaf', // generated ethereal password
    pass: 'wlyisking1010',
  },
});

class EmailService extends Service {

  async send(data) {
    // setup email data with unicode symbols
    const mailOptions = {
      from: '这是王力宇发送的测试邮件', // sender address
      to: 'wlyisking@2980.com', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world?' + data, // plain text body
      html: '<b>Hello world?</b>', // html body
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

