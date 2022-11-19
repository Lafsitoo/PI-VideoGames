import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// Hooks React
import { useEffect, useState } from "react";
// Hooks React - Redux
import { useDispatch, useSelector } from "react-redux";

// Actions Redux
import {} from "../../redux/actions";

// Componenetes React
import Form from "../Form/Form";
import NavBar from "../NavBar/NavBar";

//* COMPONENTE

function Home() {
  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Home;
