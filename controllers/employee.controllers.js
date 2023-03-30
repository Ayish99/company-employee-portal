const User = require("../models/user.model");
const Company = require("../models/company.model");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../middlewares/customError");


// exports.employeeSignUp = async (req, res) => {
//         const { email, name, password, company } = req.body;

//         if(email === undefined || email === null){
//             throw createCustomError("Invalid email!", 400);
//         }

//         if(name === undefined || name === null){
//             throw createCustomError("Invalid name!", 400);
//         }

//         if(password === undefined || password === null){
//             throw createCustomError("Invalid password!", 400);
//         }

//             //const companyData = await company.find({_id: req.body}).populate('company');
           

//         const newUser = new User();

//         newUser.name = name;
//         newUser.email = email;
//         newUser.password = password;
//         newUser.role = "employee";
//         newUser.comapny = company;
      
//         await newUser.save();
      
//         return res.status(201).json({
//           message: "Employee sign-up successfully!",
//           newUser
//         });
// }

exports.employeeSignIn = async (req, res) => {

    const { email, password, role } = req.body;

    if(email === null || password === undefined || role === undefined){
        throw createCustomError("Email or passwrod is required!", 400);
    }

    const user = await User.findOne({email});
    if(!user){
        throw createCustomError("Invalid email!", 400);
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched){
        throw createCustomError("Invalid password!", 400);
    }

    const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

    return res.status(201).json({
        message: "Employee sign-in successful!",
        accessToken
      });
}

exports.viewProfile = async (req, res) => {

    const { id } = req.params;

    if(id === undefined || id === ""){
      throw createCustomError("Invalid ID", 400)
    }

    const employeeProfile = await User.findById(id).populate('company');
    if(employeeProfile){
        res.status(201).send([employeeProfile]);
    }else{
        throw createCustomError("User not found", 400);
    }
}

exports.viewProjects = async (req, res) => {
    

}

exports.projectTeammates = async (req, res) => {
    
}

exports.viewOtherEmployees = async (req, res) => {
    
    const allEmployees = await User.find();
        if(allEmployees){
        res.status(201).send(allEmployees);
    }else{
        throw createCustomError("Employess not found", 400);
    }
}