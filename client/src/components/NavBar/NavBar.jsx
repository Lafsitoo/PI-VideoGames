import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

//* COMPONENTE

function NavBar() {
  return (
    <div class="container orange pullUpDown">
      <NavLink to="/videogames"> VideoGames </NavLink>
      <NavLink to="/home"> Home </NavLink>
      <NavLink to="/createvideogame"> Create VideoGame </NavLink>
      <NavLink to="/about"> About </NavLink>
    </div>
  );
}

export default NavBar;
