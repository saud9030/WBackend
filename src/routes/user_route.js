import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";
import passport from "passport";
import jwt from "jsonwebtoken";

// pull in error types and the logic to handle them and set status codes
import { BadParamsError } from "../lib/custom_errors";

const tokenAuth = passport.authenticate("jwt", { session: false });
const localAuth = passport.authenticate("local", { session: false });
const User = models.User;

// instantiate a router (mini app that only handles routes)
const router = express.Router();

//sign up route

router.post("/sign-up", (req, res, next) => {
  // start a promise chain, so that any errors will pass to `handle`
  Promise.resolve(req.body.credentials)
    .then(credentials => {
      if (
        !credentials ||
        !credentials.password ||
        credentials.password !== credentials.password_confirmation
      ) {
        throw new BadParamsError();
      } else {
        return User.create({
          email: credentials.email,
          hashedPassword: credentials.password
        });
      }
    })
    .then(user => {
      const payload = {
        id: user.id,
        email: user.email,
        expires: process.env.JWT_EXPIRATION_D + "d"
      };

      // assigns payload to req.user
      req.login(payload, { session: false }, error => {
        if (error) {
          next();
        }

        // generate a signed json web token and return it in the response
        const token = jwt.sign(JSON.stringify(payload), process.env.PASS_KEY);

        // assign our jwt to the cookie
        res
          .cookie("jwt", token, { httpOnly: true, secure: false })
          .status(201)
          .json({ id: req.user.id, email: req.user.email });
      });
    })
    // pass any errors along to the error handler
    .catch(next);
});

// login route

router.post("/sign-in", localAuth, (req, res, next) => {
  if (req.user) {
    // This is what ends up in our JWT
    const payload = {
      id: req.user.id,
      email: req.user.email,
      expires: process.env.JWT_EXPIRATION_D + "d"
    };

    // assigns payload to req.user
    req.login(payload, { session: false }, error => {
      if (error) {
        next();
      }

      // generate a signed json web token and return it in the response
      const token = jwt.sign(JSON.stringify(payload), process.env.PASS_KEY);

      // assign our jwt to the cookie
      res
        .cookie("jwt", token, { httpOnly: true, secure: false })
        .status(200)
        .json({ id: req.user.id, email: req.user.email });
    });
  }
});

//change password route

router.patch("/change-password", tokenAuth, (req, res, next) => {
  if (!req.body.passwords.new) throw new BadParamsError();

  User.findOne({
    where: {
      email: req.user.email
    }
  })
    .then(user => {
      if (user != null) {
        if (user.validPassword(req.body.passwords.old)) {
          user.bcrypt(req.body.passwords.new);

          res.status(200).json({ msg: "success" });
        } else {
          throw new BadParamsError();
        }
      } else {
        throw new BadParamsError();
      }
    })
    .catch(next);
});

// to get all users ** need to give users to permission to view all other users
router.get("/api/users", (req, res) => {
  models.User.findAll()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(e => console.log(e));
});

//to get the information of a specific user **need to add authentication/ permission only to other users.
router.get(
  "/api/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // to check if the user is signed in

    models.User.findByPk(req.params.id)
      .then(user => {
        //make sure what kind of data am I showing
        res.status(200).json({ user });
      })
      .catch(e => console.log(e));

    // redirect to the login page
  }
);

//to create new user account  ** check for any duplicates.
router.post("/api/user", (req, res) => {
  models.User.create(req.body)
    .then(user => {
      res.status(200).json({ name: user.name });
    })
    .catch(e => console.log(e));
});

//to update user info ** need authorization to user themselves
router.patch("/api/user/:id", (req, res) => {
  models.User.findByPk(req.params.id)
    .then(user => {
      user
        .update({
          password: req.body.password,
          age: req.body.age,
          occupation: req.body.occupation,
          bio: req.body.bio
        })
        .then(user => {
          res.status(200).json({ user });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

export default router;
