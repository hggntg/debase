const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const http = require("http");
const UAParser = require("ua-parser-js");
const fs = require("fs");

const indexTemplate = path.join(__dirname, "dist", "index.html");
const publicFolder = path.join(__dirname, "dist", "public");
const app = express();

app.get("/platform-detect", (req, res) => {
	const parsedUserAgent = new UAParser(req.headers["user-agent"]);
	const ua = parsedUserAgent.getResult();
	res.status(200).json(ua);
});

console.log(process.env["NODE_ENV"]);
if(process.env["NODE_ENV"] === "development"){
	app.use(express.static(publicFolder));
	app.get("*", (req, res) => {
		let htmlBody = fs.readFileSync(indexTemplate, { encoding: "utf8" });
		res.send(htmlBody);
	});
}

const server = http.createServer(app);

server.listen(8000);
