import moment from 'moment'
import bookDB from "./schema.js";

const bookModels = {
  createReservation: async (reservationData) => {
    try {
      // Création objet client
      const newClient = {
        civilite: reservationData.civilite,
        nom: reservationData.nom,
        prenom: reservationData.prenom,
        mail: reservationData.mail,
        telephone: reservationData.telephone,
        compagnie: reservationData.compagnie,
      };

      // Création objet véhicule
      const newVehicule = {
        marque: reservationData.marque,
        modele: reservationData.modele,
        immatriculation: reservationData.immatriculation,
      };

      // Création objet RDV avec client et vehicule
      const newRDV = new bookDB({
        date: reservationData.date,
        heure: reservationData.heure,
        client: newClient,
        vehicule: newVehicule,
        timestamp: Date.now(),
      });
      return await newRDV.save();
    } catch (error) {
      throw new Error(
        "Erreur lors de la création de la réservation : " + error.message
      );
    }
  },

  
  countReservations: async (date, heure) => {
    try {
        const count = await bookDB.countDocuments({ date, heure });
        // console.log("Nombre de réservation : ", count)
      return count;
    } catch (error) {
      throw new Error("Erreur lors du comptage des réservations : " + error.message);
    }
  },


};
export default bookModels;
