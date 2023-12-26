const express = require("express");
const getGamesById = express.Router();
const { videogame, generos, plataformas } = require("../db.js");
// trae la lista de juegos.
getGamesById.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    let gamesDB = await videogame.findOne({
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
      where: { id: id },

      through: {
        attributes: [],
      },
    });
    return res.status(200).json(gamesDB);
  } catch (error) {
    res.json(error);
  }
});
module.exports = getGamesById;
