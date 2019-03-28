// Passport Package
import passportJWT from "passport-jwt";
// Passport Options
import jwtOptions from "./passportOptions";
import models from "../db/models";

// JSON Web Token Strategy object we will be using.
const JwtStrategy = passportJWT.Strategy;

// The function(as: middleware) where we test to see if the requesting user
// has a valid JWT token or not. And to see if it has expired.
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  //   console.log("\n payload received!");
  //   console.log(`\n user id: ${jwt_payload.id} `);
  //   console.log(`\n token expires on: : ${jwt_payload.expires} `);

  models.User.findOne({ where: { id: jwt_payload.id } })
    // this is for better preformance, rather than having the database working a query, we will just send the id
    .then(user => {
      if (user !== null) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
    .catch(e => console.log(e));
});

export default strategy;
