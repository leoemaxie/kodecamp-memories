import * as fs from "node:fs";
import express from "express";
import authMiddleware from "./auth.js";

const app = express();

app.use(express.json());
app.use(authMiddleware);

app.get("/view", (req, res) => {
  if (fs.existsSync("memories.json")) {
    const file = fs.readFileSync("memories.json");
    return res.status(200).json(JSON.parse(file));
  }

  return res.status(200).send("You do not have any memories yet!");
});

app.post("/new", (req, res) => {
  const { id, content } = req.body;

  if (!id || !content || Object.keys(req.body).length != 2) {
    return res.status(400).json({ error: "Bad Request" });
  }

  let memories = { id, content };

  if (fs.existsSync("memories.json")) {
    const file = fs.readFileSync("memories.json");
    memories = [...JSON.parse(file), memories];
  }

  fs.writeFileSync("memories.json", JSON.stringify(memories));
  res.status(201).json({ message: "Memory added successfully" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("server listening at port 3000");
});
