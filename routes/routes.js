const router = require("express").Router();
const Transaction = require("../models/Transaction.js");

router.post('/budget/transaction', async (req, res) => {
  try{
    Transaction.create(req.body).then(data => {
      res.status(200).json(data);
    })
  }
  catch(err){
    res.status(404).json(err);
  }
    
})

router.get('/budget/transaction', async (req, res) => {
  try{
    Transaction.find({}).sort({date: -1}).then(data => {
      res.status(200).json(data);
    })
  }catch(err){
    res.status(404).json(err);
  }
})



module.exports = router;