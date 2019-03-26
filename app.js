import express from "express";
import group from "./routes/group_route";
const app = express();

const port = process.env.PORT || 4000;

app.use(group);
// checking that is working
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Litenin on port ${port}`));
