import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";

const route = express();

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
route.put("/api/user/:id", (req, res) => {
  models.User.findByPk(req.params.id)
    .then(user => {
      user
        .update({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          age: req.body.age,
          gender: req.body.gender,
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
