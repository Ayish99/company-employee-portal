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

    employees: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: null
    },

});

module.exports = mongoose.model('Project', projectsSchema);