import React from "react";
import './actions.css'
import { Link } from "react-router-dom";
import { useState } from "react";

function NPCActions() {

  const [isHovered0, setIsHovered0] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  return (
    <main className="content">
      <div className="bg-container"></div>
        <div className="common-content">
          <h1> Acciones NPCs </h1>
          <p> Las acciones asociadas a NPCs, como dice su
            nombre, son todas aquellas acciones que involucran la
            interaccion con los distintos NPCs que se generan por parte del juegador.
            Por ahora los NPCs disponibles son los matones y los vendedores. Se debe
            considerar que la capacidad de los edificios no se puede superar en ninguna accion
            Las acciones que se pueden realizar con los NPCs son:
          </p>
          <div className="action-cards">
              <div className="action-card" 
              onMouseEnter={() => setIsHovered0(true)}
              onMouseLeave={() => setIsHovered0(false)}>
                <div className="image">
                  <img src={isHovered0 ? "../../src/assets/troop.gif" : "../../src/assets/troop.jpg"}
                    alt="Create Troop">
                  </img>
                </div>
                <div className="content">
                  <h3> Generar NPC's </h3>
                  <p>Esta accion consiste en generar un tipo especifico de
                NPC de acuerdo al edificio donde se generen, donde los gimnasios generan
                matones y los centros de distribucion genera vendedores.</p>
                </div>
              </div>
              <div className="action-card" 
              onMouseEnter={() => setIsHovered1(true)} 
              onMouseLeave={() => setIsHovered1(false)}>
                <div className="image">
                    <img src={isHovered1 ? "../../src/assets/troops.gif" : "../../src/assets/troops.jpg"}
                      alt="Trasladar Tropas">
                    </img>
                </div>
                <div className="content">
                  <h3> Trasladar matones </h3>
                  <p>Esta accion consiste en  trasladar matones desde un edificio
                a otro, con un traslado de maximo 3 casillas colindantes entre si. Esta accion permite
                defender los edificios o atacar casillas colindantes, puesto que los matones representan
                al mismo tiempo la capacidad ofensiva como defensiva de un edificio.</p>
                </div>
              </div>
              <div className="action-card"
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}>
                <div className="image">
                    <img src={isHovered2 ? "../../src/assets/attack.gif" : "../../src/assets/attack.jpg"}
                      alt="Attack Troop">
                    </img>
                </div>
                <div className="content">
                  <h3> Atacar casilla </h3>
                  <p>Esta accion consiste en atacar con los matones que hay dentro de un edificio a
                una casilla que se encuentre colindante a la seleccionada, permitiendo, en caso de tener mayor capacidad
                ofensiva que la capacidad defensiva del rival, de dominar la casilla atacada, pero perdiendo un numero
                de matones proporcional a la capacidad defensiva del rival.</p>
                </div>
              </div>
          </div>
          <Link className="rules-button" to="/edif-action">
            Acciones Edificios 
          </Link>
          <Link className="rules-button" to="/rules">
            Volver a reglas
          </Link>
        </div>
    </main>
  )
}

export default NPCActions;