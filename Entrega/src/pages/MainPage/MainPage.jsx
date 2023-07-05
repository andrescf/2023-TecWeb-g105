import React from "react";
import { Link } from "react-router-dom";
import './mainpage.css'

function MainPage() {
  return (
    <>
    <main className="content">
        <div className="bg-container"></div>
          <div className="common-content">
              <Link className="rules-button" to="/rules">
                  PLAY NOW!
              </Link>
              <h1>Welcome to Gangster.io</h1>
              <p>Welcome to the ruthless world of organized crime! In this immersive gangster game, you'll step into the shoes of a budding crime lord, ready to build your empire and leave a lasting mark on the city's underworld. Brace yourself for a thrilling journey filled with power struggles, dangerous alliances, and heart-pounding action.</p>
              <p>As the game begins, you'll be entrusted with a small territory and a handful of loyal associates. It's up to you to transform these humble beginnings into a formidable criminal enterprise. Construct and upgrade a variety of buildings, from shady nightclubs and illicit casinos to clandestine weapons factories and high-security hideouts. Each building plays a crucial role in expanding your influence and generating the wealth needed to fuel your rise to dominance.</p>
              <p>But this game isn't just about constructing buildings; it's about making strategic moves and executing calculated plans. Engage in all manner of mafia activities: from smuggling contraband, executing daring heists, and controlling lucrative rackets, to eliminating rival gangs and enforcing your dominance through fear and respect. Remember, in this cutthroat world, only the strong survive.</p>
              <p>As you accumulate wealth and power, invest in your gear and troops. Outfit yourself with the latest weaponry, armor, and gadgets, ensuring you're always prepared for whatever challenges lie ahead. Train and upgrade your troops, molding them into a well-oiled machine capable of taking on any opponent. From street-level enforcers to elite specialists, assemble a crew that will strike fear into the hearts of your enemies.</p>
              <p>Your ultimate goal? Conquer the entire map and establish yourself as the undisputed kingpin of the city. Expand your influence, claim territories, and eliminate rival factions standing in your way. But be warned: other ambitious crime lords will stop at nothing to claim the same prize. Engage in intense battles, engage in cunning strategies, and forge strategic alliances to ensure your ascent to the top.</p>
              <p>It's time to unleash your inner mobster and make your mark on the city's underworld. Are you ready to build, scheme, and conquer? The streets are waiting, and your destiny awaits.</p>
              <Link className="rules-button" to="/rules">
                  Let's conquer the city
              </Link>
          </div>
    </main>
    </>
  )
}
export default MainPage;