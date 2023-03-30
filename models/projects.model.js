const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model('Project', projectsSchema);