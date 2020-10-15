const sgMail = require('@sendgrid/mail');
const { config } = require('./config')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = (receiver, token) => {
  return {
    to: receiver,
    from: config.senderEmail,
    subject: 'Pls verify your email',
    text: "Let's verify your email. Click link below",
    html: `<a href='${config.hostURL}auth/verify/${token}'>Start to use our awesome app</a>`
  }
}

const sendEmail = async (receiver, token) => {
  const message = await msg(receiver, token);
  console.log(message);
  try {
    await sgMail.send(message)
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendEmail,
}


