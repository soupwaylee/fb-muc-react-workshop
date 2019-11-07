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
      <PokedexDescription selectedPokemon = {selectedPokemon} />
      <PokedexImage details={details} />
      <PokedexSummary details={details} />
    </div>
  );
}

function PokedexImage(props) {
  // we could do an early return statement, but then it doesn't render the component at the very beginning, we want to render the white component (conditionally)
  // const imageURL = props.details.sprites.front_default; // in the beginning this can be null
  return (
    <div className="pokedex-image">
      {props.details && <img src={props.details.sprites.front_default}/>}
    </div>
  );
}

// needs common root
// but then you'd litter around lots of possibly useless divs --> useless weight, this adds performance penalty
// fetch data as far down as possible, so you should know exactly where to pass data and when
function PokedexSummary(props) {
  let content = null;
  if (props.details != null) {
    // use fragments
    content = (
      <>
        <h1>{props.details.name}</h1>
        <p> {props.details.id} </p>
      </>
    );
  }
  return (
    <div className="pokedex-summary">{content}</div>
  );
}

function PokedexDescription(props) {
  const { selectedPokemon } = props;
  console.log(selectedPokemon);

  const [speciesDetails, setSpeciesDetails] = useState(null);

  useEffect(() => {
    if (selectedPokemon != null) {
      setSpeciesDetails(null);
      fetch("https://pokeapi.co/api/v2/pokemon-species/" + selectedPokemon)
        .then( response => response.json())
        .then( data => {
          setSpeciesDetails(data);
        });
    }
  }, [selectedPokemon]);

  let description = null;
  if (speciesDetails != null) {
    const textEntry = speciesDetails.flavor_text_entries.find(entry => entry.language.name === 'en');
    description = textEntry.flavor_text;
  }

  return (
    <div className="pokedex-description">{description}</div>
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
