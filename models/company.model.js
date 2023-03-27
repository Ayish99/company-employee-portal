const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    }
});

module.export = mongoose.model('Company', companySchema);
