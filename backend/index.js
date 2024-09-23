const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const { verifyToken } = require("./src/middleware/authMiddleware.js");

const userSignupRoute = require("./src/routes/userRoutes/signupRoute.js");
const userLoginRoute = require("./src/routes/userRoutes/loginRoute.js");
const logoutRoute = require("./src/routes/userRoutes/logoutRoute.js");
const userRoutes = require("./src/routes/userRoute.js");
const addHomeRoute = require("./src/routes/postHouseRoutes/homeRoute.js");
const { createAddress } = require("./src/controllers/houseControllers/creationHouse/addressController.js");
const  profile  = require("./src/routes/userRoutes/loginRoute.js");
const { createBailleur } = require("./src/controllers/bailleurController.js");
const addImage = require ("./src/routes/addImage.js")
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const SESSION_NAME = process.env.SESSION_NAME || "session";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  MISSING_TOKEN: 'Token non fourni.',
  INVALID_TOKEN: 'Token invalide ou expiré.',
  EXPIRED_TOKEN: 'Token expiré.',
  SERVER_ERROR: 'Erreur interne du serveur.',
};

app.use(
  session({
    name: SESSION_NAME,
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
      secure: false,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Routes
app.use("/signup", userSignupRoute);
app.use("/login", userLoginRoute);
app.use("/profile", verifyToken, profile);
app.use("/logout", verifyToken, logoutRoute);
app.use("/user", userRoutes);
app.use("/bailleur", createBailleur);
app.use("/addHome",  addHomeRoute);
app.use("/addAddress", createAddress);
app.use("/addImage", addImage);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
});
app.listen(PORT, "192.168.149.89", () => {
  console.log(`App listening on port ${PORT}`);
});
