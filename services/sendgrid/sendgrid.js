const sgMail = require("@sendgrid/mail");
const config = require("../../config/config");
const constants = require("../../constants");
sgMail.setApiKey(config.sendgrid_api_key);

exports.sendEmail = (toEmail, data, type) => {
  let html = `<strong>${data}</strong>`;
  if (type === constants.emailTypes.PROVIDER_CREATE) {
    html = `
        <b>Email</b>: ${data.email}<br>
        <b>Created at</b>: ${data.createdAt} <br> <br>
        <b>client_id</b>: ${data.client_id}<br>
        <b>client_secret</b>: ${data.client_secret}<br> <br>
        Please keep this information safe!
    `;
  }

  const msg = {
    to: toEmail,
    from: "projectinsulate@gmail.com",
    subject: "Your Insulate Credentials",
    html: html,
  };

  return sgMail.send(msg);
};
