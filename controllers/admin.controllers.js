const User = require("../models/user.model");
const Project = require("../models/projects.model");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../middlewares/customError");


exports.adminSignUp = async (req, res) => {
        const { email, name, password, role, company } = req.body;

        if(email === undefined || email === null){
            throw createCustomError("Invalid email!", 400);
        }

        if(name === undefined || name === null){
            throw createCustomError("Invalid name!", 400);
        }

        if(password === undefined || password === null){
            throw createCustomError("Invalid password!", 400);
        }

        const newUser = new User();

        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.role = "admin";
        newUser.comapny = company;
      
        await newUser.save();
      
        return res.status(201).json({
          message: "Admin sign-up successfully!",
          newUser
        });
}

exports.adminSignIn = async (req, res) => {

    const { email, password } = req.body;

    if(email === null || password === undefined){
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

    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1s',
    });

    return res.status(201).json({
        message: "Admin sign-in successful!",
        accessToken
      });
}

exports.addNewEmployee = async (req, res) => {

    const { name, email, role, company } = req.body;

    //validations for incoming object
    if (name === undefined || name === null) {
      throw createCustomError("invalid name provided", 400);
    }
  
    if (email === undefined || email === null) {
      throw createCustomError("invalid email provided", 400);
    }

    if (role === undefined || role === null) {
        throw createCustomError("invalid role provided", 400);
    }

    if (company === undefined || company === null) {
        throw createCustomError("invalid company provided", 400);
      }
  
    const newEmployee = new User();
  
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.role = role;
    newEmployee.comapny = company;
  
    await newEmployee.save();
  
    return res.status(201).json({
      message: "New employee added!",
    });
  };
    

exports.addEmployeeToProject = async (req, res) => {
    
    const { projectName, description, employee } = req.body;

    if (projectName === undefined || projectName === null) {
      throw createCustomError("invalid project name provided", 400);
    }
  
    if (description === undefined || description === null) {
      throw createCustomError("invalid description provided", 400);
    }

    if (employee === undefined || employee === null) {
        throw createCustomError("invalid employee provided", 400);
    }

        const addToProject = new Project();

        addToProject.projectName = projectName;
        addToProject.description = description;
        addToProject.employee = employee;
      
        await addToProject.save();
      
        return res.status(201).json({
          message: "Employee added to project",
        });
};

exports.removeEmployeeFromProject = async (req, res) => {
    

};

exports.editEmployee = async (req, res) => {
    
};

exports.deleteEmployee = async (req, res) => {
    
};