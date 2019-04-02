import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";
import passport from "passport";
const tokenAuth = passport.authenticate("jwt", { session: false });

const router = express.Router();

router.post("/group/:id/events", tokenAuth, (req, res) => {
  console.log("current user id ", req.user.id);
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
      }
    })
    .catch(e => console.log(e, "error dude"));
});

// // to get all the events ** need to only display the event that are yet to happen
// router.get("/api/events", (req, res) => {
//   models.Volunteeringevent.findAll()
//     .then(events => {
//       res.status(200).json({ events });
//     })
//     .catch(e => console.log(e));
// });

// // to get the details of a specific event
// router.get("/api/events/:id", (req, res) => {
//   models.Volunteeringevent.findByPk(req.params.id)
//     .then(event => {
//       res.status(200).json({ event });
//     })
//     .catch(e => console.log(e));
// });

// // to add a new event ** need to authorize specific memebers to do so, and the date has to be valid
// router.post("/api/events", (req, res) => {
//   models.Volunteeringevent.create(req.body)
//     .then(event => {
//       res.status(200).json({ event });
//     })
//     .catch(e => console.log(e));
// });

// // to update the info of specific event ** need to authorize specific memebers to do so
// router.put("api/events/:id", (req, res) => {
//   models.Volunteeringevent.findByPk(req.params.id)
//     .then(event => {
//       event
//         .update({
//           name: req.body.name,
//           address: req.body.address,
//           data: req.body.data,
//           type: req.body.type
//         })
//         .then(event => {
//           res.status(200).json({ event });
//         })
//         .catch(e => console.log(e));
//     })
//     .catch(e => console.log(e));
// });

// // to delete an event ** need to only allow members who created the the event
// router.delete("api/events/:id", (req, res) => {
//   models.Volunteeringevent.findByPk(req.params.id)
//     .then(event => {
//       event.destroy().then(() => {
//         res.status(200).json({ result: "deleted" });
//       });
//     })
//     .catch(e => console.log(e));
// });

export default router;
