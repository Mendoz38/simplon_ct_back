
console.log("dans controllers")
import bookDB from '../models/schema.js'

const bookController = {
  findAll: (req, res) => {
    bookDB.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));    
  },
  findById: (req, res) => {
    res.status(200).json({ result: req.params.id })
  },
  create: (req, res) =>{
    res.status(201).json({ result: req.body})
  }
};

export default bookController;