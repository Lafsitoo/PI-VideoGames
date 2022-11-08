const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { getAllVideogames } = require("../controllers/index");
const router = Router();

//* OBTENER TODOS LOS JUEGOS O POR NAME

router.get("/", async (req, res) => {
  const { name } = req.query;
  // ej: videogames?name=portal
  try {
    const allVideogames = await getAllVideogames();
    if (name) {
      // Verificamos si name esta en el query
      const game = allVideogames.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      game.length ? 
        res.status(200).send(game) :
        res.status(404).send('No se encuentra el videojuego');
    }
    // Sino devolvemos todos los juegos
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
});

module.exports = router;
