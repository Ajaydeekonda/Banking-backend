const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bank: { type: String, required: true },
    holder: { type: String, required: true },
    accountno: { 
        type: String, 
        required: true, 
        validate: {
            validator: (v) => /^[0-9]{10,18}$/.test(v),
            message: props => `${props.value} is not a valid account number!`
        }
    },
    ifsc: { 
        type: String,
        required: true, 
        validate: {
            validator: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v),
            message: props => `${props.value} is not a valid IFSC code!`
        }
    },
    branch: { type: String, required: true }
});


module.exports = mongoose.model('Bank', bankSchema);
