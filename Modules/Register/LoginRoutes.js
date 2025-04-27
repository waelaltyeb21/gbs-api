const { Login, Logout } = require("./loginController");

const LoginRoutes = require("express").Router();

LoginRoutes.post("/", Login);
LoginRoutes.post("/logout", Logout);

module.exports = LoginRoutes;
