class CustomError extends Error{
    constructor(message, statusCode){
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  
  //create method to generate Custom error class
  const createCustomError = (msg, statusCode) => {
      return new CustomError(msg, statusCode);
  }
  
  
  module.exports = {
      CustomError,
      createCustomError
  }