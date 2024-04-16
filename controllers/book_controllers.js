console.log("dans controllers");
import bookDB from "../models/schema.js";


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
      const newRDV = new bookDB(req.body);
      console.log("Dans le back",req.body)
      const savedRDV = await newRDV.save();
      console.log("savedRDV ",savedRDV)
      res.status(201).json(savedRDV); 
    } catch (error) {
      console.error("Erreur lors de l'ajout du rendez-vous :", error);
      res.status(500).json({ message: "Erreur lors de l'ajout du rendez-vous" });
    }
  },

  
};

export default bookController;
