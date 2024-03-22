const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { PORT } = process.env || 8080;
const userRoutes = require("./src/routes/userRoutes/signupRoute");

app.use(express.json({ limit: "50mb" }));

app.use("/signup", userRoutes);

app.listen(PORT, "172.20.10.8", () => {
  console.log(`App listening on port ${PORT}`);
});
