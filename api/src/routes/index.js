const { Router } = require('express');
const router = Router();

//* RUTAS
const videogames = require("./videogames.routes")
const genres = require("./genres.routes")

//* PUERTOS
router.use("/videogames", videogames)
router.use("/genres", genres)

module.exports = router;
