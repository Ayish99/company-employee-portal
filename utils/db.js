const mongoose = require('mongoose');

const connectTODB = () => {
    return mongoose.connect("mongodb+srv://Ayesha:Ayesha@company.ekygp6g.mongodb.net/test");
}

module.exports = connectTODB;
