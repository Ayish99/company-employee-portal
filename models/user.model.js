require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "employee"]
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
}, { timestamps: true });

// hash password
userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
 });

 //compare password
 userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.password);
}


module.exports = mongoose.model('User', userSchema);
