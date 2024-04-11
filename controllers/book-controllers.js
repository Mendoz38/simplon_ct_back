const bookController = {
  findAll: (req, res) => {
    res.status(200).json({ message: "xxxxxxxxxx !!" });
  },
  findById: (req, res) => {
    res.status(200).json({ result: req.params.id })
  },
  create: (req, res) =>{
    res.status(201).json({ result: req.body})
  }
};

export default bookController;