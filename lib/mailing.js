import nodeMailer from "nodemailer";
import fs from "fs";

// Fonction d'envoi de courrier grâce à la librairie nodemailer
export default function sendMail(mailTo, subject, title, date, bodyContent) {

  // On lit le fichier où est stockée la clé privée DKIM
  const privateKey = fs.readFileSync("./lib/dkim.private", "utf8");

  // On crée le transporteur pour le serveur de messagerie
  let transporter = nodeMailer.createTransport({
    host: "smtp.ionos.fr",
    port: 465,
    secure: true,
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_pass,
    },
    dkim: {
      domainName: "vinsnaturels.fr",
      keySelector: "k1",
      privateKey: privateKey,
    },
  });

  // Chargement du fichier de modèle
  const templateFile1 = fs.readFileSync("./lib/template/template_reservation.html");
  const templateFile2 = fs.readFileSync("./lib/template/template2_reservation.html");

  const contenuClient = `
  Bonjour <b>${bodyContent.prenom} ${bodyContent.nom}</b>, <br />
  Je vous confirme votre RDV le <b>${date} à ${bodyContent.heure}h</b>. <br />
  Pour votre véhicule <b>${bodyContent.marque} ${bodyContent.modele}</b> immatriculé <b>${bodyContent.immatriculation}</b>. <br />
  <p>Pensez à venir avec la carte grise du véhicule</p>
`;

  const contenuTB = `
  <table >
    <tr><td>Date:</td><td>${date}</td></tr>
    <tr><td>Heure:</td><td>${bodyContent.heure} h</td></tr>
    <tr><td>Prénom:</td><td>${bodyContent.prenom}</td></tr>
    <tr><td>Nom:</td><td>${bodyContent.nom}</td></tr>
    <tr><td>Email:</td><td>${bodyContent.mail}</td></tr>
    <tr><td>Téléphone:</td><td>${bodyContent.telephone}</td></tr>
    <tr><td>Compagnie:</td><td>${bodyContent.compagnie}</td></tr>
    <tr><td>Driver:</td><td>${bodyContent.driver}</td></tr>
    <tr><td>Marque du véhicule:</td><td>${bodyContent.marque}</td></tr>
    <tr><td>Modèle du véhicule:</td><td>${bodyContent.modele}</td></tr>
    <tr><td>Immatriculation:</td><td>${bodyContent.immatriculation}</td></tr>
  </table>
`;

  // Envoi du courrier au client
  let mailOptionsClient = {
    from: "[TruckBuster] noreply@vinsnaturels.fr",
    to: mailTo,
    replyTo: title,
    subject: subject,
    html: templateFile1 + contenuClient + templateFile2,
  };

  // Envoi du courrier à la secrétaire
  let mailOptionsSecretary = {
    from: "[TruckBuster] noreply@vinsnaturels.fr",
    to: mailTo, // Adresse du client pour tester, mais il faudra mettre le mail de la secrétaire par la suite
    subject: "Nouvelle réservation",
    html: templateFile1 + contenuTB + templateFile2,
  };

  // Envoi du courrier au client
  transporter.sendMail(mailOptionsClient, (error, info) => {
    if (error) {
      console.log("Erreur lors de l'envoi de mail au client");
      return console.log(error);
    }
    console.log("Message au client %s sent: %s", info.messageId, info.response);
  });

  // Envoi du courrier à la secrétaire
  transporter.sendMail(mailOptionsSecretary, (error, info) => {
    if (error) {
      console.log("Erreur lors de l'envoi de mail à la secrétaire");
      return console.log(error);
    }
    console.log(
      "Message à la secrétaire %s sent: %s",
      info.messageId,
      info.response
    );
  });
}
