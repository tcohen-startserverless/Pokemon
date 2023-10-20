import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [offset, setPage] = useState(0);
  const [path, setPath] = useState<"search" | "inventory">("search");

  const handleClick = (count: number) => {
    setPage(offset + count);
  };

  const handleNav = (nav: "search" | "inventory") => {
    setPath(nav);
  };

  return (
    <>
      <ul className="nav">
        <li className="nav-item" onClick={() => handleNav("search")}>
          Search
        </li>
        <li className="nav-item" onClick={() => handleNav("inventory")}>
          Inventory
        </li>
      </ul>
      {path == "search" ? (
        <div>
          <Pagination offset={offset}></Pagination>
          <button disabled={offset <= 0} onClick={() => handleClick(-20)}>
            Prev Page
          </button>
          <button onClick={() => handleClick(20)}>Next Page</button>
        </div>
      ) : (
        <Inventory></Inventory>
      )}
    </>
  );
}

interface PaginationProps {
  offset: number;
}

interface Entry {
  name: string;
  url: string;
}

function Pagination(props: PaginationProps) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const { offset } = props;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setEntries(data.results);
      });
  }, [offset]);

  return (
    <>
      <div className="page">
        {entries ? (
          entries.map((entry) => <PokemonComponent url={entry.url} />)
        ) : (
          <p> Loading..</p>
        )}
      </div>
    </>
  );
}

function Inventory() {
  const api = "https://35swevm5og.execute-api.us-east-1.amazonaws.com/pokemon";
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);

  useEffect(() => {
    console.log(api);
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <div className="page">
        {pokemon ? (
          pokemon.map((poke) => (
            <PokemonComponent
              url={`https://pokeapi.co/api/v2/pokemon/${poke.id}`}
            />
          ))
        ) : (
          <p> Loading..</p>
        )}
      </div>
    </>
  );
}

interface PokemonProps {
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

function PokemonComponent(props: PokemonProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { url } = props;
  const api = "https://35swevm5og.execute-api.us-east-1.amazonaws.com/pokemon";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
      });
  }, [url]);

  const handleClick = () => {
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    }).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <>
      {pokemon ? (
        <div className="pokemon">
          <img src={pokemon.sprites.front_default} alt="" />
          <p>{pokemon.name.toLocaleUpperCase()}</p>
          <ul className="abilities subline">
            Abilities
            {pokemon.abilities.map((ability) => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
          <ul className="types subline">
            Types
            {pokemon.types.map((type) => (
              <li>{type.type.name}</li>
            ))}
          </ul>
          <button onClick={handleClick}>Catch</button>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
}

export default App;
