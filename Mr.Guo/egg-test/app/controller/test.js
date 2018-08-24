'use strict';

const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');

class Mailer extends Controller {
   async sentMail() {
    let transporter = nodemailer.createTransport({
        //   host: 'smtp.ethereal.email',
          service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
          port: 465, // SMTP 端口
          secureConnection: true, // 使用了 SSL
          auth: {
            user: '906068053@qq.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'ziwvgfjmlxiubeie',
          }
        });
        
        let mailOptions = {
          from: '<906068053@qq.com>', // sender address
          to: '13021098675@163.com', // list of receivers
        //   to: '123@example.com, "Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>',
          subject: 'Hello', // Subject line
          // 发送text或者html格式
          // text: 'Hello world', // text 格式
          html: `<b>
                Hello world</br>
                <a href="baidu.com">
                    <img src="http://p15.jmstatic.com/zengzhang/83264308e1b51c2a48be3b31b634a452.png"/>
                </a>
            </b>` // html 格式，需要html片段
        };
        // send mail with defined transport object
        await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
        this.ctx.body = `Mail sent successfully`;
   }
}

module.exports = Mailer;
