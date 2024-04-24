import constantDB from "../models/schema_constant.js";

const constantController = {
  getConstant: (req, res) => {
    constantDB
      .find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },


};
export default constantController;
