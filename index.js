import express from "express";
import fs;
import authMiddleware from "./auth"; 

const app = express();

app.use(express.json());
app.use(authMiddleware);

app.get("/view", (req, res) => {
  if (fs.existsSync("memories.json")) {
    const file = fs.readFileSync("memories.json");
    return res.status(200).json(file);
  }

  return res.status(200).send("You do not have any memories yet!");
});

app.post("/new", (req, res) => {
  const { id, content } = req.body;

  if (fs.existsSync("memories.json")) {

    const file = fs.readFileSync("memories.json");
    const memories = JSON.parse(file);

  }

  return res.status(200).send("You do not have any memories yet!");
})

app.listen(3000, () => {
  console.log("server listening at port 3000");
});







app.listen(3000, () => {
  console.log("server listening at port 3000");
});

