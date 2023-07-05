import React from "react";
import './rules.css';
import { Link } from "react-router-dom";

function Rules() {
  return (
    <main className="content">
      <div className="bg-container"></div>
        <div className="common-content">
          <h1> Reglas </h1>
          <p> Hola Ganster! Este juego se basa en la consquista de toda la ciudad
            conocida como New Grey, una ciudad de principios de siglo XX dominada
            por la corrupcion, el alcohol, los vicios y la violencia. Para poder
            ganar debes ser capaz de destruir la base de todos los demas Ganster
            que buscan dominar la ciudad o generar que se retiren de la ciudad por 
            su propia voluntad.
          </p>
          <p> Este juego se basa en un sistema de turnos, donde cada jugador podra
            realizar acciones unicamente cuando este en su turno. Durante su turno 
            cada jugador dispondra de 1 minuto para realizar el total de 3 acciones,
            donde de acuerdo a los recursos que posea se restringira cuales estan disponibles.
            Por acciones se consideran:
          </p>
          <Link className="rules-button" to="/edif-action">
            Acciones edificios
          </Link>
          <Link className="rules-button" to="/npc-action">
            Acciones NPCs
          </Link>
        </div>
    </main>
  )
}

export default Rules;