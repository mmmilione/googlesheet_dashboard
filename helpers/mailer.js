const { mailGunApiKey } = require('../secrets');
const getDate = require('./date');

const mgConstructor = {
  apiKey: mailGunApiKey,
  domain: 'no-reply.criptolibre.com',
  host: 'api.eu.mailgun.net'
};

const mailgun = require('mailgun-js')(mgConstructor);

const sendPW = async (receiver, pw, ts) => {
    
  try{
    
    //Compose email
    let mailText = 'Hola' + receiver+ ',\n\n';
        mailText += 'A continuacion encuentras la password para entrar al dashboard de DGD:';
        mailText += '\n\n';
        mailText += pw;
        mailText += '\n\n';
        mailText += "El acceso es valido hasta el dia: " + getDate(ts) + "."
        mailText += '\n\n';
        mailText += 'En cuanto ejecutes el login por primera vez, vas a tener que cambiar la password. Aconsejamos que escojas una password facil de recordar.'
        mailText += '\n\n';
        mailText += 'Visita la URL https://criptolibre.com/DGD/ para loguearte';
        mailText += '\n\n';
        mailText += 'Atentamente, \n\n';
        mailText += 'DGD';
    
    const mailHTML = `<p>Hola ${receiver},</p>
    <p>A continuacion encuentras la password para entrar al dashboard de DGD:</p>
    <p>${pw}</p>
    <p>El acceso es valido hasta el dia: ${getDate(ts)}.</p>
    <p>En cuanto ejecutes el login por primera vez, vas a tener que cambiar la password. Aconsejamos que escojas una password facil de recordar.</p>
    <p>Haz <a href="https://criptolibre.com/DGD/">CLICK AQUI</a> para loguearte.</p>
    <p>Atentamente,</p>
    <p>DGD</p>`;
    
    //Set mail options
    const emailOptions = {
      from: 'DGD <no-reply@criptolibre.com>',
      to: receiver,
      subject: "DGD Dashboard - Acceso Habilitado",
      html: mailHTML,
      text: mailText
    };

    //Send email
    //Async delivery
    await mailgun.messages().send(emailOptions);

  }catch(error){
    console.log(error);
    throw Error('Mail Failed');
  }

}

const sendExtension = async (receiver, ts) => {
    try {
        //Compose email
        let mailText = 'Hola' + receiver+ ',\n\n';
        mailText += "El acceso al dashboard ha sido prorogado hasta el dia: " + getDate(ts) + "."
        mailText += '\n\n';
        mailText += 'Visita la URL https://criptolibre.com/DGD/ para loguearte';
        mailText += '\n\n';
        mailText += 'Atentamente, \n\n';
        mailText += 'DGD';

        const mailHTML = `<p>Hola ${receiver},</p>
        <p>El acceso al dashboard DGD ha sido prorogado hasta el dia: ${getDate(ts)}.</p>
        <p>Haz <a href="https://criptolibre.com/DGD/">CLICK AQUI</a> para loguearte.</p>
        <p>Atentamente,</p>
        <p>DGD</p>`;

        //Set mail options
        const emailOptions = {
            from: 'DGD <no-reply@criptolibre.com>',
            to: receiver,
            subject: "DGD Dashboard - Acceso Prorogado",
            html: mailHTML,
            text: mailText
        };

        //Async delivery
        await mailgun.messages().send(emailOptions);

    } catch (error) {
        console.log(error);
        throw Error('Mail Failed');
    }
}

const sendRecovery = async (receiver, pw) => {
    try {

        //Compose email
        let mailText = 'Hola' + receiver+ ',\n\n';
        mailText += 'A continuacion encuentras la password para entrar al dashboard de DGD:';
        mailText += '\n\n';
        mailText += pw;
        mailText += '\n\n';
        mailText += 'En cuanto ejecutes el login, vas a tener que cambiar la password. Aconsejamos que escojas una password facil de recordar.'
        mailText += '\n\n';
        mailText += 'Visita la URL https://criptolibre.com/DGD/ para loguearte';
        mailText += '\n\n';
        mailText += 'Atentamente, \n\n';
        mailText += 'DGD';

        const mailHTML = `<p>Hola ${receiver},</p>
        <p>A continuacion encuentras la password para entrar al dashboard de DGD:</p>
        <p>${pw}</p>
        <p>En cuanto ejecutes el login, vas a tener que cambiar la password. Aconsejamos que escojas una password facil de recordar.</p>
        <p>Haz <a href="https://criptolibre.com/DGD/">CLICK AQUI</a> para loguearte.</p>
        <p>Atentamente,</p>
        <p>DGD</p>`;

        //Set mail options
        const emailOptions = {
            from: 'DGD <no-reply@criptolibre.com>',
            to: receiver,
            subject: "DGD Dashboard - Password Reseteada",
            html: mailHTML,
            text: mailText
        };

        //Async delivery
        await mailgun.messages().send(emailOptions);

    } catch (error) {
        console.log(error);
        throw Error('Mail Failed');
    }
}

module.exports = { sendPW, sendExtension, sendRecovery };