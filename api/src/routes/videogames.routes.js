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
      game.length
        ? res.status(200).json(game)
        : res
            .status(404)
            .send(`No se ha podido encontrar ${name} en nuestra libreria`);
    }
    // Sino devolvemos todos los juegos
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
});

//* OBTENER POR ID

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const totalVideogames = await getAllVideogames();
    // Si hay ID la devolvemos
    if (id) {
      const gameId = totalVideogames.filter((el) => el.id == id);
      gameId.length
        ? res.status(200).json(gameId)
        : res.status(404).send("Busqueda no encontrada");
    }
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
});

//* CREAR UN NUEVO VIDEOJUEGO

router.post("/", async(req, res) => {
  
})

module.exports = router;
