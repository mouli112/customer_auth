const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.js');

// Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobileNumber, address, pinCode } = req.body;
  if (!firstName || !lastName || !email || !mobileNumber || !address || !pinCode ) {
    return res.status(400).json({ message: 'Please provide all required fields' });
}
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      mobileNumber,
      address,
      pinCode
    });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
