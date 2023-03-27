const { CustomError } = require("./customError");

const customErrorHandler = (err, req, res, next) => {
  console.log(err);

  // our custom errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.message === "jwt expired") {
    return res.status(401).json({
      message: "access denied, your token expired, signin again",
    });
  }

  //remaining errors
  return res.status(500).json({ message: "something went wrong!" });
};

module.exports = customErrorHandler;