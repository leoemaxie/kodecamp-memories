import * as fs from "node:fs";
import express from "express";
import authMiddleware from "./auth.js";

const app = express();
const fileName = "memories.json";

app.use(express.json());
app.use(authMiddleware);

app.get("/view", (req, res) => {
  const { id } = req.query;

  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName);
    const memories = JSON.parse(file);

    if (id) {
      const memory = memories.find((memory) => memory.id == id);

      if (!memory) {
        return res.status(404).json({ error: "Memory not found" });
      }
      return res.status(200).json(memory);
    }

    return res.status(200).json(memories);
  }

  return res.send("You do not have any memories yet!");
});

app.post("/new", (req, res) => {
  const { id, content } = req.body;

  if (!id || !content || Object.keys(req.body).length !== 2) {
    return res.status(400).json({ error: "Bad Request" });
  }

  if (
    typeof content !== "string" ||
    (typeof id !== "number" && typeof id !== "string")
  ) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const fileExists = fs.existsSync(fileName);
  const file = fileExists ? fs.readFileSync(fileName) : null;
  const memories = file ? JSON.parse(file) : [];

  if (memories.find((memory) => memory.id === id)) {
    return res.status(409).json({ error: "Id already exists" });
  }

  fs.writeFileSync(fileName, JSON.stringify([...memories, { id, content }]));

  res.status(201).json({ message: "Memory added successfully" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
