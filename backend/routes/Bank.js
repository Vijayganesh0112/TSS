const express = require ('express');

const { Bank } = require('../../backend/components/bankdetails'); 
const { authenticate } = require('../middlewares/auth');

const router = express.Router();
// Route to Fetch Bank Details
router.get('/bank', async (req, res) => {
  try {
    const bankId = req.params.id;
    const bankDetails = await Bank.find();

    if (!bankDetails) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    return res.status(200).json(bankDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
