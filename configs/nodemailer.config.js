const nodemailer = require("nodemailer");
const config = require("./auth.config");

const hostUrl = process.env.hostURL;
const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (email, token) => {
  console.log(email, token, "check");
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
       
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link
        Click on this link to verify your email ${hostUrl}/verification?token=${token}&email=${email}
        </p>
       
        </div>`,
  }).catch(err => console.log(err));
};