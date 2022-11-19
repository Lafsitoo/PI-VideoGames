import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <main>
      <Link to="/home">
        <button> Entrar </button> 
      </Link>
    </main>
  );
}

export default LandingPage;
