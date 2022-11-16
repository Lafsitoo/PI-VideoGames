import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./From.css"
// Hooks React - Redux
import { useDispatch, useSelector } from "react-redux";
// Actions Redux
import {} from "../../redux/actions";
// Componentes
import NavBar from "../NavBar/NavBar";

//* COMPONENTE

function Form() {
  const dispatch = useDispatch();
  const history = useHistory(); // Nos redirigira a la ruta que le asignemos
}

export default Form;
