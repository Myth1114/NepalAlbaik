const Users = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

exports.getUserById = catchAsync(async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.googleLoginFirebase = catchAsync(async (req, res, next) => {
  const idToken = req.body.IdToken;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const { name, picture, email, user_id } = decodedToken;

  if (email) {
    const user = await Users.findOne({ email: email }).exec();
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        SameSite: "None",
      });
      console.log("this is the response for user", {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        address: user.address,
      });
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        address: user.address,
      });
    } else {
      const newUser = await Users.create({
        name: name,
        email,

        photo: picture,
      });

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        SameSite: "None",
      });
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        photo: newUser.photo,
        role: newUser.role,
      });
    }
  }
});

exports.signOut = catchAsync(async (req, res, next) => {
  req.user = null;

  res.clearCookie("token").status(200).json({
    status: "success",
  });
});
