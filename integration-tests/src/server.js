import express from "express";
import db from "./db";

const app = express();

app.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  res.json(await db.getUserByUsername(username));
});

export { app };
