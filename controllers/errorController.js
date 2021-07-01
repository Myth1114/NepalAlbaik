const AppError = require("./../utils/appError");
const handleValidationErrorDB = err => {
  errors = Object.values(err.errors).map(el => el.message);
  
  const message = `validation error ${errors.join(" & ")}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.name;
  const message = `duplicate field value: ${value}  please use another value`;
  return new AppError(message, 500);
};
const handleCastErrorDB = err => {
  const message = `invalid id ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    err: err,
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    stack: err.stack
  });
};
const sendErrPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: "Error",
      message: "something went wrong"
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    
    
    
    let error = JSON.parse(JSON.stringify(err));
    
    if (err.code === 11000) error = handleDuplicateFieldsDB(error); 
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);

    sendErrPro(error, res);
  }
};
