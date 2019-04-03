import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";
import passport from "passport";
import jwt from "jsonwebtoken";
// import { cloneDeep } from "sequelize/types/lib/utils";
const groups = models.Group;
const user = models.User;
// const userGroups = models.userGroups;

const router = express.Router();
const localAuth = passport.authenticate("local", { session: false });

// to get all the volunteers group
router.get("/api/groups", (req, res) => {
  models.Group.findAll({
    include: [models.UserGroup]
  })
    .then(group => {
      res.status(200).json({ group: group });
    })
    .catch(e => console.log(e));
});
//to add users and groups to the joinTabel(which is to identify who are the memebers)
router.post("/user/:id/groups", (req, res) => {
  console.log(req.params.id);
  console.log(req.body.group_id);
  models.UserGroup.create({
    user_id: req.params.id,
    group_id: req.body.group_id
  })
    .then(userGroup => {
      res.status(200).json({ userGroup });
    })
    .catch(e => console.log(e));
});

// to remove a member from a group "when a member decides to leave"
router.delete("/user/:id/group/:gid", (req, res) => {
  console.log("hello");
  models.UserGroup.destroy({
    where: {
      user_id: req.params.id,
      group_id: req.params.gid
    }
  })
    .then(() => {
      res.status(200).json({ msg: "success" });
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
