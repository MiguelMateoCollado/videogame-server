const express = require("express");
const routes = require("./routes.js");
const { conn } = require("./db.js");
const server = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credential", "true");
  const allowedOrigins = [
    "https://api.rawg.io/",
    "https://videogames.mmateo.com/",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use("/", routes);
server.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`Everything is ready in ${port}`);
  });
});
