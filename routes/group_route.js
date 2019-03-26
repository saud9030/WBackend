import express from "express";
import models from "../db/models";

const route = express();

// to get all the volunteers group
route.get("/api/group", (req, res) => {
  models.Group.findAll()
    .then(group => {
      res.status(200).json({ group: group });
    })
    .catch(e => console.log(e));
});

export default route;
