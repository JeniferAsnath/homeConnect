const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const { PORT } = process.env || 3000;
const userSignup = require("./src/routes/userRoutes/signupRoute.js");
const userLogin = require ("./src/routes/userRoutes/loginRoute.js")
const userRoutes = require('./src/routes/userRoute.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

app.use("/signup", userSignup);
app.use('/login', userLogin);
app.use("/user", userRoutes)

app.listen(PORT, "192.168.164.89", () => {
  console.log(`App listening on port ${PORT}`);
});
