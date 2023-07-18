const User = require("../models/user.model");
const Project = require("../models/projects.model");
const jwt = require("jsonwebtoken");
const { ObjectId } = require ('mongoose')
const { createCustomError } = require("../middlewares/customError");


exports.adminSignUp = async (req, res) => {
  const { email, name, password, role, company } = req.body;

  if (email === undefined || email === null) {
    throw createCustomError("Invalid email!", 400);
  }

  if (name === undefined || name === null) {
    throw createCustomError("Invalid name!", 400);
  }

  if (password === undefined || password === null) {
    throw createCustomError("Invalid password!", 400);
  }

  if (role === undefined || role === null) {
    throw createCustomError("Invalid password!", 400);
  }

  const newUser = new User();


  newUser.name = name;
  newUser.email = email;
  newUser.password = password;
  newUser.role = role;
  newUser.company = company;

 const user =  await newUser.save();
 console.log(user);
 const {_id, email:userEmail } = user

  return res.status(201).json({
    message: "Admin sign-up successfully, please sign-in!",
    newUser:{_id, email:userEmail}
  });
};

exports.adminSignIn = async (req, res) => {

  const { email, password } = req.body;

  if (email === undefined && password === undefined ) {
    throw createCustomError("Email or passwrod is required!", 400);
  }

  if (email === null && password === null) {
    throw createCustomError("Email or passwrod is required!", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createCustomError("Invalid email!", 400);
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    throw createCustomError("Invalid password!", 400);
  }

  const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return res.status(201).json({
    message: "Admin sign-in successful!",
    accessToken
  });
};

exports.addNewEmployee = async (req, res) => {

  const { name, email, password, role, company } = req.body;

  if (name === undefined || name === null) {
    throw createCustomError("invalid name provided", 400);
  }

  if (email === undefined || email === null) {
    throw createCustomError("invalid email provided", 400);
  }

  if (role === undefined || role === null) {
    throw createCustomError("invalid role provided", 400);
  }

  if (password === undefined || password === null) {
    throw createCustomError("invalid role provided", 400);
  }

  if (company === undefined || company === null) {
    throw createCustomError("invalid company provided", 400);
  }

  const employeeExist = await User.findOne({email});

  console.log(employeeExist);

  if(employeeExist){
    throw createCustomError("Employee already exists with provided email", 400);
  }

  const newEmployee = new User();

  newEmployee.name = name;
  newEmployee.email = email;
  newEmployee.password = password;
  newEmployee.role = role;
  newEmployee.company = company;



  await newEmployee.save(User.user, '-password');

  return res.status(201).json({
    message: "New employee added!",
    newEmployee
  });
};

exports.addEmployeeToProject = async (req, res) => {

  const { projectId, employeeId } = req.body;

const projectExist = await Project.findById(projectId);

if(!projectExist){
  throw createCustomError("Project does not exist!", 400);
}

const updatedProjectEmployees = [...projectExist.employees]

const employeeExist = updatedProjectEmployees.includes(employeeId)

console.log(updatedProjectEmployees)

if(employeeExist === true){
  throw createCustomError("Employee already exists!", 400);
}

updatedProjectEmployees.push(employeeId)

const updateProject = await Project.findByIdAndUpdate(projectId, { employees: updatedProjectEmployees }, {new: true});


  return res.status(201).json({
    message: "Employee added to project",
    updateProject
  });
};

exports.removeEmployeeFromProject = async (req, res) => {
  const { employeeId, projectId } = req.body;

  if (employeeId === undefined || employeeId === null) {
    throw createCustomError("Invalid employee id provided", 400);
  }

  if (projectId === undefined || projectId === null) {
    throw createCustomError("Invalid project id provided", 400);
  }

  const projectExist = await Project.findById(projectId);
  
  if (!projectExist) {
    throw createCustomError("Project does not exist", 400);
  }

  const projectEmployees = [...projectExist.employees]
  const employeeExist = projectEmployees.includes(employeeId)

  if(!employeeExist){
    throw createCustomError("Employee does not exist", 400);
  } 

  const removeEmployee = await Project.findByIdAndDelete(employeeId);

  return res.status(201).json({
    message: "Employee removed from the project",
    removeEmployee
  });
};

exports.editEmployee = async (req, res) => {
  const { name, email, password, role, company } = req.body
  const { id } = req.params

  if (id === undefined || id === null) {
    throw createCustomError("Invalid id provided", 400);
  }

    const updatedEmployee = await User.findByIdAndUpdate(id, { name, email, password, role, company })

    if (!updatedEmployee) {
      throw createCustomError("Employee does not exist", 400);
    }
  
  return res.status(201).json({
    message: "Employee updated",
    updatedEmployee
  });

};

exports.deleteEmployee = async (req, res) => {

  const { id } = req.params;

  if (id === undefined || id === null) {
    throw createCustomError("Invalid id provided", 400);
  }

  const deleteEmployee = await User.findByIdAndDelete(id);

  if (!deleteEmployee) {
    throw createCustomError("Employee does not exist", 400);
  }

  return res.status(201).json({
    message: "Employee deleted",
    deleteEmployee
  });
};