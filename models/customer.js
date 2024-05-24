const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const customerSchema = new mongoose.Schema({
  customerId: { 
    type: String,
    default: uuidv4,
  },

  firstName: { 
    type: String, 
    required: true,
  },

  lastName: { 
    type: String, 
    required: true,
  },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (mobile) => {
        // Regular expression to match mobile numbers with country code
        return /^\+\d{1,3}\d{10}$/.test(mobile);
      },
      message: 'Mobile number must be in the format +<country code><10 digits>',
    },
  },
  address: { 
    type: String, 
    required: true,
  },
  pinCode: { 
    type: Number, 
    required: true,
    validate: {
      validator: (pin) => {
        // Assuming pin code validation for a generic format (e.g., 5 or 6 digits)
        return /^\d{5,6}$/.test(pin);
      },
      message: 'Pin code must be 5 or 6 digits',
    },
  },
});

module.exports = mongoose.model('Customer', customerSchema);
