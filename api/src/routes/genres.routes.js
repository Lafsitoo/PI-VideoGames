const axios = require("axios");
const { Router } = require("express");
const { Genre } = require("../db");
const { API_KEY } = process.env;
const router = Router();

//* RUTA TODAS LAS DIETAS

router.get("/", async (req, res) => {
  const apiInfo = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  try {
    const genres = await apiInfo.data.results.map((el) => el.name);
    // Se guardan los generos en DB
    genres.forEach((el) => {
      Genre.findOrCreate({
        where: { name: el },
      });
    });
    // Buscamos en DB y enviamos
    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
});

module.exports = router;
