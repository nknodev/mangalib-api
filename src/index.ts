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



const api_url = "https://mangalib-api.nkno.site"
const ml_url = "https://mangalib.me"
const st_url = "https://staticlib.me"
const forum_url = "https://lib.social"



const port = 80;


// Forum endpoints
app.get("/v1/forum", (req, res) => {
  res.send({
    ok: true,
    endpoints: [
    	"getposts",
    	"getpostdetail"
    
    ]
    
  });
});

app.get("/v1/getposts", (req, res) => {
const page = req.query.includes("page") ? req.query.page : "1"
axios.get(`${forum_url}/api/forum/disscussion?page=${page}`)
	.then((dota) => {
	var data = dota.data
  res.send({
    ok: true,
    pagination: {
    	page: data.current_page,
	posts_per_page: data.per_page
    },
    posts: data.data
	  
    
  });
})
});




// Main endpoints
app.use("/v1/", (req, res) => {
  res.send({
    ok: true,
    message:
      "welcome to mangalib api v1.",
    
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
  console.log("[Server] Listening on port: " + port);
});
