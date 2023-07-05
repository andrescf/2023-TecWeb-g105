import React from "react";
import './creators.css'
import { Link } from "react-router-dom";

function ACatalan() {
  return (
    <main className="content">
      <div className="bg-container"></div>
        <div className="content">
          <h1> Andres Catalan </h1>
          <p> Andres es un estudiante de Ingenieria Fisica
             que tiene 23 años y mide 187 cm. Sus juegos 
             favoritos son el Minecraft y LoL. 
          </p>
          <Link className="rules-button" to="/gajardo">
            Sebastian Gajardo 
          </Link>
        </div>
    </main>
  )
}

export default ACatalan;