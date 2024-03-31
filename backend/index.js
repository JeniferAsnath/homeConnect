const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const session = require('express-session');
const cors = require('cors');



const { PORT } = process.env || 3000;
const userSignup = require("./src/routes/userRoutes/signupRoute.js");
const userLogin = require ("./src/routes/userRoutes/loginRoute.js")
const logout = require ("./src/routes/userRoutes/logoutRoute.js")
const userRoutes = require('./src/routes/userRoute.js');
const addHome = require ("./src/routes/homeRoute.js");
const { createAddress } = require("./src/controllers/addressController.js");
const { profile } = require("./src/controllers/userControllers/loginController.js");
const { createBailleur } = require("./src/controllers/bailleurController.js");
const { verifyToken } = require("./src/middleware/authMiddleware.js");



app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(cors());

app.use("/signup", userSignup);
app.use('/login', userLogin);
app.use("/profile", verifyToken, profile);
app.use("/logout", verifyToken, logout);
app.use("/user", userRoutes)
app.use("/bailleur", createBailleur)
app.use("/addHome", addHome)
app.use("/addAddress", createAddress)
app.use("/homes", addHome)





app.listen(PORT, "192.168.34.89", () => {
  console.log(`App listening on port ${PORT}`);
});
