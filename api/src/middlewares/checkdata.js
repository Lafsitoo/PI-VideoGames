const checkData = async (req, res, next) => {
  // Info que pido
  const { name, description, released, rating, platforms, image, genres } =
    req.body;
  //* VALIDACIÓN
  // Apartados oblicatorios
  if (!(name && description && platforms)) {
    return res.status(404).send({ error: "Fatan parámetros obligatorios" });
  }
  if (genres.length != 0) {
    return res.status(404).send({ error: "Fatan generos obligatorios" });
  }
  // Si nombre del juego ya existe
  const findVideogame = await Videogame.findAll({ where: { name: name } });
  if (findVideogame.length != 0) {
    return res.send(`El nombre ${name} ya esta en uso`);
  }
  // Si todo fue OK, seguimos
  next();
};

module.exports = checkData;
