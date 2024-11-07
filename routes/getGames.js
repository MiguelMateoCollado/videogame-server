const express = require("express");
const getGames = express.Router();
const { videogame, generos, plataformas } = require("../db.js");
// trae la lista de juegos.
getGames.get("/", async (req, res) => {
  try {

    let gamesDB = await videogame.findAll({
      include: [
        {
          model: generos,
          as: "genres",
        },
        {
          model: plataformas,
          as: "platforms",
        },
      ],

      through: {
        attributes: [],
      },
    });
    return res.status(200).json(gamesDB);
  } catch (error) {
    console.log(error)
    res.json(error);
  }
});

// trae los primeros 15 juegos que coincidan con las letras del params

module.exports = getGames;
