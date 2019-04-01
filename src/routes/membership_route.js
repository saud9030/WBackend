// import express from "express";
// import models from "../db/models";
// import bodyParser from "body-parser";
// import passport from "passport";

// const router = express.Router();

// //get all the events that are created by the group
// // router.get('/api/group/:id/events', (req, res) => {
// //     models.Group.findByPk(req.params.id {
// //         include: [{models: models.Volunteeringevent}]
// //     })
// // })

// // router.post("/api/group/:id/member/user/:id", (req, res) => {
// //   const userID = models.User.findByPk(req.params.id);
// //   const groupID = models.Group.findByPk(req.params.id);
// //   models.GroupMembers.create(req.body)
// //     .then(member => {
// //       res.status(200).json({ userId: member.userID, groupId: member.groupID });
// //     })
// //     .catch(e => console.log(e));
// // });

// // router.post(
// //   "/api/group/:id/member",
// //   passport.authenticate("jwt", { session: false }),
// //   (req, res) => {
// //     models.Group.findByPk(
// //       req.params.id({
// //         include: [{ models: models.GroupMembers }]
// //       })
// //     );
// //     models.GroupMembers.create(req.body)
// //       .then(group => {
// //         res.status(200).json({ group });
// //       })
// //       .catch(e => console.log(e));
// //   }
// // );
