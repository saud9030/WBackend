import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";

const route = express();

// to get all the volunteers group
route.get("/api/groups", (req, res) => {
  models.Group.findAll()
    .then(group => {
      res.status(200).json({ group: group });
    })
    .catch(e => console.log(e));
});

//to get the information of a specific voulnteer group **need to add authentication
route.get("/api/group/:id", (req, res) => {
  models.Group.findByPk(req.params.id)
    .then(group => {
      res.status(200).json({ group });
    })
    .catch(e => console.log(e));
});

//to create new volunteer group ** need to authenticate and check for any duplicates.
route.post("/api/group", (req, res) => {
  models.Group.create(req.body)
    .then(group => {
      res.status(200).json({ group });
    })
    .catch(e => console.log(e));
});

//to update group info, or it's members ** need authorization to specific member
route.put("/api/group/:id", (req, res) => {
  models.Group.findByPk(req.params.id)
    .then(group => {
      group
        .update({
          name: req.body.name,
          city: req.body.city,
          founded: req.body.founded,
          description: req.body.description,
          contactNumber: req.body.contactNumber,
          Email: req.body.email,
          type: req.body.type
        })
        .then(group => {
          res.status(200).json({ group });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

export default route;
