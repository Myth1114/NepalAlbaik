const express = require("express");
const User = require("./../models/userModel");

const Router = express.Router();
const UserController = require(`${__dirname}/../controllers/userController`);
const AuthController = require(`${__dirname}/../controllers/authController`);

Router.route("/signOut").get(AuthController.protect, UserController.signOut);

Router.route("/googleLoginFirebase").post(UserController.googleLoginFirebase);

Router.route("/:id").get(AuthController.protect, UserController.getUserById);

module.exports = Router;
