const express = require("express");
const fetch = require("node-fetch")
const { generos } = require("../db.js");
const getgeneros = express.Router();
// obtiene todos los generos de juegos y los agrega a una tabla
getgeneros.get("/", async (req, res) => {
  try {
    const generosList = await fetch(
      `https://api.rawg.io/api/genres?key=8241d0d446564eb08ad666f383656f59`
    ).then((response) => response.json());

    let gen = await generosList.results.map((gen) => {
      generos.findOrCreate({
        where: { name: gen.name, id: gen.id },
      });
    });
    const allGeneros = await generos.findAll();
    res.status(200).json(await allGeneros);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = getgeneros;
