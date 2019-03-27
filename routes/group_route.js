import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";
import passport from "passport";

const router = express.Router();

// to get all the volunteers group
router.get("/api/groups", (req, res) => {
  models.Group.findAll()
    .then(group => {
      res.status(200).json({ group: group });
    })
    .catch(e => console.log(e));
});

//to get the information of a specific voulnteer group **need to add authentication
router.get("/api/group/:id", (req, res) => {
  models.Group.findByPk(req.params.id)
    .then(group => {
      res.status(200).json({ group });
    })
    .catch(e => console.log(e));
});

//to create new volunteer group ** need to authenticate and check for any duplicates.
router.post(
  "/api/group",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    models.Group.create(req.body)
      .then(group => {
        res.status(200).json({ group });
      })
      .catch(e => console.log(e));
  }
);

//to update group info, or it's members ** need authorization to specific member
router.put("/api/group/:id", (req, res) => {
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

export default router;
