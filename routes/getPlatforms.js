const express = require("express");
const fetch = require("node-fetch")
const { plataformas } = require("../db.js");
const getplatforms = express.Router();
// obtiene todos los generos de juegos y los agrega a una tabla
getplatforms.get("/", async (req, res) => {
  try {
    const platforms = await fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=8241d0d446564eb08ad666f383656f59`
    ).then((response) => response.json());

    let plata = await platforms.results.map((platform) => {
      plataformas.findOrCreate({
        where: { name: platform.name, id: platform.id },
      });
    });
    const allplatforms = await plataformas.findAll();
    res.status(200).json(await allplatforms);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = getplatforms;
