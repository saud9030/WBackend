// loads environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();
import models from "./db/models";
import groupRoute from "./routes/group_route";
import user from "./routes/user_route";
import vevent from "./routes/vevent_route";
import bodyParser from "body-parser";
import passport from "passport";
import errorHandler from "./lib/error_handler"; //  error handling middleware
import strategy from "./lib/passportStrategy";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

const port = process.env.PORT;

// register passport authentication middleware
app.use(strategy);

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
app.use(bodyParser.json());

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

// this parses requests sent by `fetch`, which use a different content type
app.use(bodyParser.urlencoded({ extended: true }));
// route files
app.use(groupRoute);
app.use(user);
app.use(vevent);

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler);

// run API on designated port (4741 in this case)
// app.listen(port, () => {
//   console.log("listening on port " + port);

// });

// app.listen(port, () => {
//   console.log(`listening on port${port}`);
//   models.sequelize
//     .sync({})
//     .then(() => console.log("sync success"))
//     .catch(e => console.log(e));
// });

// models.Group.findOne({ where: { id: 1 } }).then(group => {
//   models.User.findByPk(2).then(user => {
//     //user.addMember(group);
//     //console.dir(models);
//   });
// });

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
// })
// .catch(e => console.log(e));

// app.listen(port, () => console.log(`Litenin on port ${port}`));
