import express from "express";

const app = express();

app.get("/users/:username", async (req, res) => {
  res.json({});
});

export { app };
