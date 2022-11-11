const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { getAllVideogames } = require("../controllers/index");
const checkData = require("../middlewares/checkdata");
const router = Router();

//* OBTENER TODOS LOS JUEGOS O POR NAME

router.get("/", async (req, res) => {
  const { name } = req.query;
  // ej: "/videogames?name=portal"
  try {
    const allVideogames = await getAllVideogames();
    if (name) {
      // Verificamos si "name" esta en nuestra bibloteca
      const gameName = allVideogames.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      gameName.length
        ? res.status(200).json(gameName)
        : res
            .status(404)
            .send(`No se ha podido encuentrar ${name} en nuestra bibloteca`);
    } else {
      // Sino devolvemos todos los juegos
      res.status(200).send(allVideogames);
    }
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

router.post("/", async (req, res) => {
  // info que pido
  const { name, description, released, rating, platforms, image, genres } =
    req.body;
  try {
    // creo nuevo game, sin "genres"
    const gameCreated = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      // platforms: platforms.join('- '),
      // platforms: platforms.toString(),
      image,
      genres,
    });
    // busco la genre en db
    const genreInDb = await Genre.findAll({
      where: { name: genres },
    });
    // lo añadimos
    gameCreated.addGenre(genreInDb);
    res
      .status(200)
      .send(`¡Felicidades! ${name} añadido a la bibloteca con Exito`);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
