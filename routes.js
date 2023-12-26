const { Router } = require("express");
const getGames = require("./routes/getGames.js");
const getPlatforms = require("./routes/getPlatforms");
const getGenres = require("./routes/getGenres");
const PostGame = require("./routes/PostGame");
const getDetails = require("./routes/getDetails.js");
const getGamesById = require("./routes/getGamesById.js");
const router = Router();
router.use("/videogames", getGames);
router.use("/videogames", getGamesById);
router.use("/platforms", getPlatforms);
router.use("/generos", getGenres);
router.use("/create", PostGame);
router.use("/videogames", getDetails);

module.exports = router;
