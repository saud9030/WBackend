import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";

const router = express.Router();

//login route
router.post("/api/login", (req, res) => {
  if (req.body.email && req.body.password) {
    // find the user in the database
    models.User.findOne({
      where: { email: req.body.email }
    })
      .then(user => {
        if (user !== null) {
          if (user.password === req.body.password) {
            const payload = {
              id: user.id
            };
            const token = jwt.sign(payload, jwtOptions.secretOrKey, {
              expiresIn: 6000
            });

            res.status(200).json({ success: true, token: token });
          } else {
            res.status(400).json({ error: "invalid email or password" });
          }
        } else {
          res.status(400).json({ error: "invalid email or password" });
        }
      })
      .catch(e => console.log(e));
  }
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
          res.status(200).json({ user })
        })
        .catch(e => console.log(e));

      // redirect to the login page
    }
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
