const express = require("express")
require("dotenv").config();
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const passport_jwt = require("./src/config/Authentication");
const port = process.env.PORT || 8200;

const router = require("./src/routes/index.routes")
const ErrorHandler = require("./src/middleware/ErrorHandler");

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());


app.use("/", router);
app.use(ErrorHandler);
app.listen(port, () => console.log(`Server is Listening on Port:- ${port}`));