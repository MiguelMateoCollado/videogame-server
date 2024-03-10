const fetch = require("node-fetch")
async function getVideogames() {
  let key = "8241d0d446564eb08ad666f383656f59";
  let url1 = await fetch(
    `https://api.rawg.io/api/games?key=8241d0d446564eb08ad666f383656f59&page_size=40`
  ).then(response => response.json());
  let url2 = await fetch(
    `https://api.rawg.io/api/games?key=8241d0d446564eb08ad666f383656f59&page_size=40&page=2`
  ).then(response => response.json());
  let url3 = await fetch(
    `https://api.rawg.io/api/games?key=8241d0d446564eb08ad666f383656f59&page_size=40&page=3`
  ).then(response => response.json());
  let result = url1.results
    .concat(url2.results)
    .concat(url3.results);
  return result;
}

module.exports = getVideogames;
