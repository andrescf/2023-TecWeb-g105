import React from "react";
import './about-us.css'
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <main className="content">
      <div className="bg-container"></div>
        <div className="common-content">
          <h1> Quienes son los creadores de Ganster.io </h1>
          <p> Los creadores de este juego son dos estudiantes de
            Ingenieria UC, los  cuales están cursando el ramo de
            Tecnologias y Aplicaciones Web. Ellos son:
          </p>
          <Link className="rules-button" to="/creadores">
            Creadores
          </Link>
        </div>
    </main>
  )
}

export default AboutUs;