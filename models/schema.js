import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    date: Date, 
    heure: Number,
    client: {
      civilite: String,
      nom: String,
      prenom: String,
      email: String,
      tel_mobile: String,
      compagnie: String
    },
    vehicule: {
      marque: String,
      modele: String,
      immatriculation: String
    },
    timestamp: Number
}, 
// Nom de la collection
{    collection: 'RDV' }
);
  
  const bookDB = mongoose.model('RDV', bookSchema);
  
  export default bookDB;