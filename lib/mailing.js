import nodeMailer from 'nodemailer';
import fs from 'fs';

console.log("mailing.js")

// Fonction d'envoi de courrier grâce à la librairie nodemailer
export default function sendMail(mailTo, subject, title, text) {

  // On lit le fichier où est stockée la clé privée DKIM
  const privateKey = fs.readFileSync("./lib/dkim.private", "utf8");

  // On crée le transporteur pour le serveur de messagerie
  let transporter = nodeMailer.createTransport({
    host: 'smtp.ionos.fr',
    port: 465,
    secure: true,
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_pass
    },
    dkim: {
      domainName: "vinsnaturels.fr",
      keySelector: "k1",
      privateKey: privateKey
    }

  });

  // Chargement du fichier de modèle
  const templateFile = fs.readFileSync("./lib/template/template_reservation.html", "utf8");

  let mailOptions = {
    from: '[TruckBuster] noreply@vinsnaturels.fr', 
    to: mailTo,
    cc : "janine@truckbuster.co",
    replyTo: title,
    subject: subject, 
    text: 'Je vous confirme votre RDV le ', 
    html: templateFile, 
  }; 
  // Envoi du courrier
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de mail');
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
