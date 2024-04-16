console.log("dans controllers");
import bookDB from "../models/schema.js";
import mail from "../lib/mailing.js"; 

const bookController = {
  findAll: (req, res) => {
    bookDB
      .find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },
  
  findById: (req, res) => {
    res.status(200).json({ result: req.params.id });
  },

  create: async (req, res) => {
    try {
    // Créer un nouvel objet client
    const newClient = {
      civilite: req.body.civilite,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      tel_mobile: req.body.tel_mobile,
      tel_fixe: req.body.tel_fixe
    };

    // Créer un nouvel objet véhicule
    const newVehicule = {
      marque: req.body.marque,
      modele: req.body.modele,
      immatriculation: req.body.immatriculation
    };

    // Créer un nouvel objet RDV avec les sous-documents client et vehicule
    const newRDV = new bookDB({
      date: req.body.date,
      heure: req.body.heure,
      pont: req.body.pont, // Je ne sais pas si cette propriété est utilisée ailleurs
      client: newClient,
      vehicule: newVehicule,
      timestamp: Date.now() // Si vous souhaitez enregistrer un horodatage
    });


    console.log("Dans le back", req.body);
    const savedRDV = await newRDV.save();
    console.log("savedRDV ", savedRDV);
    res.status(201).json(savedRDV);
      // envoi du mail
      console.log("EMAIL : ", req.body.mail)
/*     mail(
        req.body.mail,
        "Confirmation de votre réservation",
      ); */
    } catch (error) {
      console.error("Erreur lors de l'ajout du rendez-vous :", error);
      res.status(500).json({ message: "Erreur lors de l'ajout du rendez-vous" });
    }
  },

  
};

export default bookController;
