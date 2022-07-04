const express = require("express");
const app = express();
import url from "url";
import qs from "querystring";
import axios from "axios";
import chalk from 'chalk';
import rateLimit from 'express-rate-limit'

// Rate-Limit
const seclimiter = rateLimit({
	windowMs: 1000,
	message: {"ok": false, "error": "Too many requests. Bruh. Be slow."},
	max: 5,
	legacyHeaders: true,
})

const minlimiter = rateLimit({
	max: 60,
	message: {"ok": false, "error": "Too many requests. Bruh. Be slow."},
	legacyHeaders: true,
})










app.use(seclimiter)
app.use(minlimiter)


// Rate-limit for opp

const api_url = "https://shirix-backend.vercel.app"




const port = 80;






// Main endpoints
app.use("/v1/", (req, res) => {
  res.send({
    ok: true,
    message:
      "welcome to shirix api v1.",
    
  });
});

app.use("/", (req, res) => {
  res.redirect('/v1')
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "where are you? 404",
    favorite_food: "pancakeeeeks!!"
  });
});

app.listen(port, () => {
  console.log("[Shirix.Server] Listening on port: " + port);
});
