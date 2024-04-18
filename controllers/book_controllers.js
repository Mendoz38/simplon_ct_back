import bookDB from "../models/schema.js";
import bookModels from "../models/book_models.js";
import mail from "../lib/mailing.js";


const bookController = {
  /* Cherche tous les RDV  */
  findAll: (req, res) => {
    bookDB
      .find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },

  checkRDV: async (req, res) => {
    try {
      const { date, heure } = req.body; 
      const count = await bookModels.countReservations(date, heure);
      //console.log("count", count)
      res.json({ count });
    } catch (error) {
      //console.error("Erreur lors de la recherche par heure :", error);
      res.status(500).json({ error: error.message });
    }
    
  },
  /* Ajouter réservation */
  create: async (req, res) => {
    console.log("Ajouter réservation", req.body)
    try {
      const newReservation = await bookModels.createReservation(req.body);
      res.status(201).json(newReservation);

      // envoi du mail
    /*       mail(
        req.body.mail,
        `Confirmation de votre réservation le ${req.body.date} à  ${req.body.heure}h `,
      ); */
    } catch (error) {
      console.error("Erreur lors de l'ajout du rendez-vous :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout du rendez-vous" });
    }
  },
  
/*
  findByHour: async (req, res) => {
    console.log("xxxxxxxxxxxxxx", req.body)
    try {
      const { date, heure } = req.body; // Assurez-vous que les données sont envoyées en tant que query params
      const count = await bookModels.countReservations(date, heure);
      res.json({ count });
    } catch (error) {
      console.error("Erreur lors de la recherche par heure :", error);
      res.status(500).json({ error: error.message });
    }
  },
*/


};
export default bookController;
