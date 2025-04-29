const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let botRunning = false;
let selectedCoin = "";

app.post("/start", (req, res) => {
  const { coin } = req.body;
  if (!coin) return res.status(400).json({ error: "Coin is required" });

  botRunning = true;
  selectedCoin = coin;
  console.log(`Strategy started for ${coin}`);
  return res.json({ message: `Strategy started for ${coin}` });
});

app.post("/stop", (req, res) => {
  botRunning = false;
  console.log("Strategy stopped.");
  return res.json({ message: "Strategy stopped" });
});

app.get("/status", (req, res) => {
  return res.json({
    running: botRunning,
    coin: selectedCoin || null,
  });
});

app.listen(PORT, () => {
  console.log(`PB Log backend running on port ${PORT}`);
});
