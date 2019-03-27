import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";

const route = express.Router();

//login route
router.post("/api/login", (req, res) => {
  if (req.body.email && req.body.password) {
    models.User.findOne({
      where: { email: req.body.email }
    })
      .then(user => {
        if (user !== null) {
          if (user.password === req.body.password) {
            //store selected information in a var that will be send back
            const payload = {
              name: user.name
              // more information to be send
            };
            jwt.sign(payload);
            res.status(200).json({ msg: "good job" });
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
route.get("/api/users", (req, res) => {
  models.User.findAll()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(e => console.log(e));
});

//to get the information of a specific user **need to add authentication/ permission only to other users.
route.get("/api/user/:id", (req, res) => {
  models.User.findByPk(req.params.id)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(e => console.log(e));
});

//to create new user account  ** check for any duplicates.
route.post("/api/user", (req, res) => {
  models.User.create(req.body)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(e => console.log(e));
});

//to update user info ** need authorization to user themselves
route.patch("/api/user/:id", (req, res) => {
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

export default route;
