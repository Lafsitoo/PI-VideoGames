const axios = require("axios");
//? traigo los modelos
const { Videogame, Genre } = require("../db");
//? traigo la key
const { API_KEY } = process.env;

//* PEDIDO DE DATOS A LA API

const getApiInfo = async () => {
  const allGames = [];

  for (let i = 1; i <= 5; i++) {
    let infoApi = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    infoApi.data.results.map((e) => {
      allGames.push({
        id: e.id,
        name: e.name,
        img: e.background_image,
        genres: e.genres.map((e) => e.name).join(", "),
        released: e.released,
        rating: e.rating,
        platform: e.platforms.map((e) => e.platform.name).join(", "),
      });
    });
  }

  return allGames;
};

//* PEDIDO A LA BASE DE DATOS

const getInfoDb = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      // sobre esta tabla
      through: {
        attributes: [],
      },
    },
  });
};

//* UNION

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getInfoDb();
  const allVideogames = apiInfo.concat(dbInfo);
  return allVideogames;
};

module.exports = {
  getAllVideogames,
};
