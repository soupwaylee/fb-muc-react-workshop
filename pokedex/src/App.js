import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const pokemon = [
    { name: "Ditto" },
    { name: "Charizard" },
    { name: "Venusaur" }
  ];

  // let selectedPokemon = null; this is supposed to be internal state
  const [
    /* getter: */ selectedPokemon, 
    /* setter: */ setSelectedPokemon
    ] = useState(/* initial state */ null);

  console.log("App is being rendered!");

  return (
    <div className="pokedex">
      <div >
        <ul className="pokedex-list"> 
          <li>Selected: {selectedPokemon}</li>
          {
            pokemon.map((p, index) => {
              const number = String(index + 1).padStart(3, "0");
              const buttonClass = p.name === selectedPokemon ? "active" : null;
              return (
                <li key={p.name}>
                  <button onClick={ () => {
                    //selectedPokemon = p.name;
                    setSelectedPokemon(p.name);
                    console.log("Button was clicked");
                    } }>
                    <strong>{number}</strong> {p.name}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="pokedex-description"></div>
      <div className="pokedex-image"></div>
      <div className="pokedex-summary"></div>
    </div>
  );
}

export default App;
