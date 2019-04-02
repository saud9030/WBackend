import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";
import passport from "passport";
const tokenAuth = passport.authenticate("jwt", { session: false });

const router = express.Router();

// this route to create a new event by only the owner of the group
router.post("/group/:id/events", tokenAuth, (req, res) => {
  // get the group by its id and then compare its user_id to the current user
  models.Group.findByPk(req.params.id)
    .then(group => {
      if (group.user_id === req.user.id) {
        console.log("hewwwwwwwwwwllo");
        models.Vevent.create({
          name: req.body.name,
          location: req.body.location,
          date: req.body.date,
          group_id: req.params.id
        })
          .then(event => {
            res.status(200).json({ event });
          })
          .catch(e => console.log(e));
        // console.log("hello");
      } else {
        res.status(400).json({ msg: "error" });
      }
    })
    .catch(e => console.log(e, "error dude"));
});

//this route to update the info of an event by only the owner of the group
router.patch("/group/:id/event/:vd", tokenAuth, (req, res) => {
  models.Group.findByPk(req.params.id)
    .then(group => {
      if (group.user_id === req.user.id) {
        models.Vevent.findByPk(req.params.vd).then(event => {
          event
            .update({
              name: req.body.name,
              location: req.body.location
            })
            .then(event => {
              res.status(200).json({ event });
            })
            .catch(e => console.log(e));
        });
      } else {
        res.status(400).json({ msg: "error" });
      }
    })
    .catch(e => console.log(e));
});

//this route to delete an event ONLY by the owner of the group
router.delete("/group/:id/event/:vd", tokenAuth, (req, res) => {
  models.Group.findByPk(req.params.id).then(group => {
    if (group.user_id === req.user.id) {
      models.Vevent.destroy({
        where: {
          id: req.params.vd
        }
      })
        .then(event => {
          res.status(200).json({
            msg: `this event ${req.params.vd} has been deleted`,
            event: event
          });
        })
        .catch(e => console.log(e));
    } else {
      res.status(400).json({ msg: "error, probably not authorized" });
    }
  });
});
// to get all the events ** need to only display the event that are yet to happen
router.get("/api/events", (req, res) => {
  models.Vevent.findAll({
    include: [models.Attendee]
  })
    .then(events => {
      res.status(200).json({ events });
    })
    .catch(e => console.log(e));
});

// to get the details of a specific event
router.get("/api/event/:id", (req, res) => {
  models.Vevent.findByPk(req.params.id)
    .then(event => {
      res.status(200).json({ event });
    })
    .catch(e => console.log(e));
});

//to add users and events to the joinTabel(which is to identify who are the attendees)
router.post("/user/:id/events", (req, res) => {
  console.log(req.params.id);
  console.log(req.body.vevent_id);
  models.Attendee.create({
    user_id: req.params.id,
    vevent_id: req.body.vevent_id
  }).then(attendees => {
    res.status(200).json({ attendees });
  });
});

// to remove a member from a group "when a member decides to leave"
router.delete("/user/:id/event/:gid", (req, res) => {
  models.Attendee.destroy({
    where: {
      user_id: req.params.id,
      vevent_id: req.params.gid
    }
  })
    .then(Attendee => {
      res.status(200).json({ Attendee });
    })
    .catch(e => console.log(e));
});

// to get all the attendees in the same event
router.get("/api/event/:id/attendees", (req, res) => {
  models.Attendee.findAll({
    include: [models.User],
    where: {
      vevent_id: req.params.id
    }
  })
    .then(attendees => {
      res.status(200).json({ attendees });
    })
    .catch(e => console.log(e));
});
export default router;
