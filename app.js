// loads environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();

import models from "./db/models";
import group from "./routes/group_route";
import user from "./routes/user_route";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./lib/passportStrategy";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

const port = process.env.PORT || 4000;

//to define our strategy
passport.use(strategy);

//** middleware **/
app.use(passport.initialize());
app.use(bodyParser.json());
// Parse Cookie header and populate req.cookies
app.use(cookieParser());
app.use(group);
app.use(user);

// checking that is working
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Litenin on port ${port}`));
