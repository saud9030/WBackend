import express from "express";
import models from "../db/models";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/group/:id/events", (req, res) => {
  console.log("hello");
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
