const express = require("express");
const fetch = require("node-fetch");
const PostGame = express.Router();
const { Op } = require("sequelize");
const { videogame, generos, plataformas } = require("../db.js");
// crea un juego nuevo
PostGame.post("/", async (req, res) => {
  try {
    const {
      name,
      date,
      description,
      rating,
      platforms,
      createInDb,
      background_image,
      genres,
      website,
    } = req.body;
    
    let platformsReformed = [];
    platforms.forEach((element) => {
      platformsReformed.push(element.label);
    });
    let genresReformed = [];
    genres.forEach((element) => {
      genresReformed.push(element.label);
    });

    const newGame = await videogame.create({
      name,
      date,
      description,
      rating,
      background_image,
      createInDb,
      website,
    });

    let generosDB = await generos.findAll({
      where: {
        name: {
          [Op.in]: genresReformed,
        },
      },
    });
    console.log(generosDB);
    let platformsDB = await plataformas.findAll({
      where: {
        name: {
          [Op.in]: platformsReformed,
        },
      },
    });
    console.log(platformsDB);

    newGame.addGenre(generosDB);
    newGame.addPlatform(platformsDB);

    return res.status(200).json(newGame);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
module.exports = PostGame;
