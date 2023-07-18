const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Company', companySchema);
