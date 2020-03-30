import express from "express";
import db from "./db";

const app = express();

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const data = await db.getUserByUsername(username);
    if (!data) {
      res.status(404).send();
      return;
    }

    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

export { app };
