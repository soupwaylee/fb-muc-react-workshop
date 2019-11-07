import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // i forgot why there needs to be [] or null
  const [pokemon, setPokemon] = useState([]);
  const [details, setDetails] = useState(null); 

  // let selectedPokemon = null; this is supposed to be internal state
  const [
    /* getter: */ selectedPokemon, 
    /* setter: */ setSelectedPokemon
    ] = useState(/* initial state */ null);

  console.log("App is being rendered!");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then( response => response.json())
      .then( data => {
        setPokemon(data.results);
      });
  }, []); // this is the recommended way (don't use lifecycle states) - function components, creating classes is more expensive
  /* specify an empty array, we don't want to load the whole list each time. (TODO understand this later)
  
   */

  useEffect(() => {
    if (selectedPokemon != null) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
        .then( response => response.json())
        .then( data => {
          console.log(data);
          setDetails(data);
        });
    }
  }, [selectedPokemon]);

  return (
    <div className="pokedex">
      <PokedexList
        pokemon={pokemon}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <div className="pokedex-description"></div>
      <PokedexImage />
      <div className="pokedex-summary"></div>
    </div>
  );
}

function PokedexImage(props) {
  const imageURL = props.details
  return (
    <div className="pokedex-image">
      <img src={imageURL}/>
    </div>
  );
}

function PokedexList(props) { // this is a component now
  // console.log(props);
  // const pokemon = props.pokemon;
  // const selectedPokemon = props.selectedPokemon;
  // const setSelectedPokemon = props.setSelectedPokemon; this looks ugly

  const { pokemon, selectedPokemon, setSelectedPokemon } = props; // but this is better

  return (
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
  );
}

export default App;
