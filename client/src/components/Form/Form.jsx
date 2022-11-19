import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./From.css";
// Hooks React - Redux
import { useDispatch, useSelector } from "react-redux";
// Actions Redux
import { postVideogame, getAllGenres } from "../../redux/actions";
// Listas
import { platformsList, genresList } from "./utils";
// Componentes
import NavBar from "../NavBar/NavBar";

//* COMPONENTE

function Form() {
  const dispatch = useDispatch();
  const history = useHistory(); // Nos redirigira a la ruta que le asignemos

  //* ESTADOS

  const genre = useSelector((state) => state.genres);

  // Propiedades de para el nuevo game
  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    releaseDate: "",
    img: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  // reinicio
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  //* MANEJO DE ERRORES

  // parte manejo de errores
  const [errorValidation, setErrorValidation] = useState({
    form: "Formulario incompleto",
  });

  // match es para buscar obtener ocurencias dentro del array ej:(\d+(\.\d)*)
  function validate(newGame) {
    let error = {};

    // name
    if (
      newGame.name.length >= 0 &&
      !newGame.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)
    ) {
      error.name = "Se requiere un nombre valido";
    } else error.name = null;
    // image
    if (
      newGame.img.length > 1 &&
      !newGame.img.match(/^(ftp|http|https):\/\/[^ "]+$/)
    ) {
      error.img = "Debe ser una URL";
    }
    // description
    if (newGame.summary.length === 0) {
      error.description = "Se requiere una descripción";
    } else error.description = null;
    // rating
    if (!newGame.rating > 0) {
      error.rating = "Debe ser entre 0 y 5";
    } else error.rating = null;
    // date
    if (newGame.releaseDate.length === 0) {
      error.releaseDate = "Se requiere una fecha";
    } else error.releaseDate = null;
    return error;
  };

  //* LOGICAS

  // Manejo de cambio de valores ( escribir en los inputs )
  function handleChange(e) {
    setNewGame({
      ...newGame,
      [e.target.name]: e.target.value,
    });

    setErrorValidation(
      validate({
        ...newGame,
        [e.target.name]: e.target.value,
      })
    );
  }

  // Verificar y finalizar la creación
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(newGame));
    alert(`¡La receta ${newGame.name} fue creada con exito!`);
    setNewGame({
      name: "",
      description: "",
      releaseDate: "",
      img: "",
      rating: 0,
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }

  //* RENDER

  return (
    <>
      <NavBar />
      <main>
        <form>
          <div>
            <h1> Agrega un nuevo Juego </h1>
          </div>

          {/* NOMBRE */}

          <div>
            <label className="label">
              Nombre <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${
                newGame.name.length < 5 ? "wrong-input" : "correct-input"
              }`}
              type="text"
              placeholder="GTA VI"
              name="name"
              value={newGame.name}
              onChange={(e) => {
                handleChange(e);
              }}
              tabIndex={-1}
              required
            ></input>
            {errorValidation.name && (
                <alert> falta </alert>
              )}
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="label">
              Descripción <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${
                newGame.description.length < 5 ? "wrong-input" : "correct-input"
              }`}
              type="text"
              placeholder="Descripción"
              name="description"
              value={newGame.description}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            ></input>
          </div>

          {/* FECHA DE LANZAMIENTO */}

          <div>
            <label className="label">
              Fecha de lanzamiento <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${
                newGame.releaseDate.length < 1 ? "wrong-input" : "correct-input"
              }`}
              type="date"
              name="releaseDate"
              value={newGame.releaseDate}
              onChange={(e) => handleChange(e)}
              required
            ></input>
          </div>

          {/* IMAGEN */}

          <div>
            <label className="label"> Imágen </label>
            <input
              className="content"
              type="url"
              placeholder="https://"
              name="img"
              value={newGame.img}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
          </div>

          {/* RATING */}

          <div>
            <label className="label">
              Rating <span className="requiredLabel">*</span>
            </label>
            <input
              className="range"
              type="range"
              name="rating"
              value={newGame.rating}
              onChange={(e) => handleChange(e)}
              min="0"
              max="5"
              step="0.05"
              onInput
              required
            ></input>
            <span
              className={`input ${
                newGame.rating <= 0 ? "wrong-span" : "correct-span"
              }`}
            >
              {newGame.rating}
            </span>
          </div>

          {/* GENRES */}

          <div>
            <label className="label">
              Géneros <span className="requiredLabel">*</span>
            </label>
            <div className="content">
              {genre.map((e) => {
                return (
                  <ul>
                    <li key={Text.name}>
                      <input type="checkbox" value={e.name}></input>
                      <label htmlFor={e.name}> {e.name}</label>
                    </li>
                  </ul>
                );
              })}
            </div>
            {errorValidation.genres && (
              <h5 className="error">{errorValidation.genres}</h5>
            )}
          </div>

          {/* PLATFORMS */}

          <div>
            <label className="label">
              Plataformas <span className="requiredLabel">*</span>
            </label>
            <div className="content">
              {platformsList.map((e) => {
                return (
                  <ul>
                    <li key={Text.name}>
                      <input type="checkbox" value={e}></input>
                      <label htmlFor={e}> {e}</label>
                    </li>
                  </ul>
                );
              })}
            </div>
            {errorValidation.platforms && (
                <h5 className="error">{errorValidation.platforms}</h5>
              )}
          </div>

          {/* SUBMIT */}

          <div>
            <button
              className="glow-on-hover"
              type="submit"
              disabled={
                  !(
                    errorValidation.name === null &&
                    errorValidation.description === null &&
                    errorValidation.rating === null &&
                    errorValidation.releaseDate === null
                  )
                }
              onClick={(e) => handleSubmit(e)}
            >
              Crear Juego
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Form;
