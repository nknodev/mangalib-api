const express = require("express");
const app = express();
import url from "url";
import qs from "querystring";
import axios from "axios";
import chalk from 'chalk';
import rateLimit from 'express-rate-limit'
import { fetch } from 'fetch-h2' // чтобы обойти cf надо юзать http2
const http2 = require('http2')

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
// важное примечание! сейчас из-за новизны сайта social он недостаточно защищен в плане апи, поэтому я буду изпользовать его при запросах к апи мангалиба


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

app.get("/v1/forum/getposts", async (req, res) => {
const page = req.query.page != null && req.query.page != "" ? req.query.page : "1"
const r = request(`${forum_url}/api/forum/disscussion?page=${page}`)
		const data = r
  		res.send(
    			data
	  
    
  		);
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


// http2 function
function request(url: str) {
	const session = http2.connect(url)
	const req = session.request({ ':path': '/' })
	req.end()
	let data = ''
	req.on('data', (chunk) => { data += chunk })
	req.on('end', () => {
  		session.close()
		return data
	})
}



app.listen(port, () => {
  console.log("[Server] Listening on port: " + port);
});
