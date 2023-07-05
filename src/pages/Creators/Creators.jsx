import React from "react";
import './creators.css';

function Creators() {
    return (
        <main className="content">
            <div className="bg-container"></div>
            <div className="creators-content">
                <div className="creators-card">
                    <img src="../../src/assets/sebastian.jpg" alt="Card Image" className="creators-card-image"></img>
                    <div className="creators-card-content">
                        <h2 className="creators-card-name">Sebastian Gajardo</h2>
                        <p className="creators-card-description">Sebastian es un estudiante de ingenieria civil industrial 
                            de 23 años, que mide alrededor de 167 cm. Entre sus pasatiempos
                            destacan el jugar futbol o futsal, el ver series o peliculas y
                            el jugar videojuegos, donde los soulslike son su categoria favorita.</p>
                    </div>
                </div>
                <div className="creators-card">
                    <img src="../../src/assets/andres.jpg" alt="Card Image" className="creators-card-image"></img>
                    <div className="creators-card-content">
                        <h2 className="creators-card-name">Andres Catalan</h2>
                        <p className="creators-card-description">Andres es un estudiante de Ingenieria Fisica
                        que tiene 23 años y mide 187 cm. Sus juegos 
                        favoritos son el Minecraft y LoL.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Creators