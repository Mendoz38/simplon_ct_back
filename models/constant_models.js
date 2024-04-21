import constantDB from "./schema.js";

const constantModels = {
  
  getConstant: async (date, heure) => {
    try {
        const count = await constantDB.countDocuments({ date, heure });
        // console.log("Nombre de réservation : ", count)
      return count;
    } catch (error) {
      throw new Error("Erreur lors du comptage des réservations : " + error.message);
    }
  },


};
export default constantModels;
