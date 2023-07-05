import React from "react";
import './creators.css'
import { Link } from "react-router-dom";

function SGajardo() {
  return (
    <main className="content">
      <div className="bg-container"></div>
        <div className="content">
          <h1> Sebastian Gajardo </h1>
          <p> Sebastian es un estudiante de ingenieria civil industrial 
            de 23 años, que mide alrededor de 167 cm. Entre sus pasatiempos
            destacan el jugar futbol o futsal, el ver series o peliculas y
            el jugar videojuegos, donde los soulslike son su categoria favorita. 
          </p>
          <Link className="rules-button" to="/catalan">
            Andres Catalan 
          </Link>
        </div>
    </main>
  )
}

export default SGajardo;