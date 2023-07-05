import React from "react";
import './actions.css'
import { Link } from "react-router-dom";
import { useState } from "react";

function EdifActions() {

  const [isHovered0, setIsHovered0] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  return (
    <main className="content">
      <div className="bg-container"></div>
        <div className="common-content">
          <h1> Acciones edificios </h1>
          <p> Las acciones asociadas a edificios, como dice su
            nombre, son todas aquellas acciones que involucran la
            interaccion con los distintos tipos de edificios. Por ahora
            los edificios disponibles son X, los gimnasios y los centros
            de distribucion de alcohol. Las acciones que se pueden realizar 
            con los edificios son:
          </p>
          <div className="action-cards">
              <div className="action-card"
              onMouseEnter={() => setIsHovered0(true)}
              onMouseLeave={() => setIsHovered0(false)}>
                <div className="image">
                  <img src={isHovered0 ? "../../src/assets/building.gif" : "../../src/assets/building.jpg"} alt="Create Building"></img>
                </div>
                <div className="content">
                  <h3> Create a Building</h3>
                  <p>Esta accion consiste en que en una casilla vacia se coloque un edificio de nivel minimo.</p>
                </div>
              </div>
              <div className="action-card"
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}>
                <div className="image">
                  <img src={isHovered1 ? "../../src/assets/upgrade.gif" : "../../src/assets/upgrade.jpg"} alt="Create Building"></img>
                </div>
                <div className="content">
                  <h3> Upgrade a Building</h3>
                  <p>Esta accion consiste en subir el nivel de un edificio que se encuentre en una casilla, mejorando la capacidad de NPC dentro de la misma.</p>
                </div>
              </div>
              <div className="action-card"
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}>
                <div className="image">
                  <img src={isHovered2 ? "../../src/assets/destroy.gif" : "../../src/assets/destroy.jpg"} alt="Create Building"></img>
                </div>
                <div className="content">
                  <h3> Destroy a Building</h3>
                  <p>Esta accion consiste en la destruccion del edificio que se encuentre en la casilla seleccionada, permitiendo colocar otro edificio en el lugar seleccionado.</p>
                </div>
              </div>
          </div>
          <Link className="rules-button" to="/npc-action">
            Acciones NPCs
          </Link>
          <Link className="rules-button" to="/rules">
            Volver a reglas
          </Link>
        </div>
    </main>
  )
}

export default EdifActions;