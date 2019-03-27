import models from "./db/models";
import group from "./routes/group_route";
import user from "./routes/user_route";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./lib/passportStrategy";
import express from "express";

const app = express();

const port = process.env.PORT || 4000;

//to define our strategy
passport.use(strategy);

//** middleware **/
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(group);
app.use(user);

// checking that is working
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Litenin on port ${port}`));
