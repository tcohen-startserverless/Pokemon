import { useEffect, useState } from "react";
import "./App.css";

interface Entry {
  name: string;
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

function setLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function App() {
  const [offset, setPage] = useState(0);
  const [path, setPath] = useState<"search" | "inventory">("search");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pagePokemon, setPagePokemon] = useState<Pokemon[]>([]);
  const [inventory, setInventory] = useState<Pokemon[]>([]);
  const [key, setKey] = useState<String>("");
  const api = `${import.meta.env.VITE_APP_API_URL}/pokemon`;

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

  useEffect(() => {
    const fetchData = async () => {
      if (entries) {
        const pokeList = await Promise.all(
          entries!.map((entry) => {
            return fetch(entry.url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error");
                }
                return response.json();
              })
              .then((data) => {
                return data as Pokemon;
              });
          })
        );
        setPagePokemon(pokeList);
      }
    };

    fetchData();
  }, [entries]);

  useEffect(() => {
    const storedData = getLocalStorage<Pokemon[]>("inventory");
    if (storedData) {
      setInventory(storedData);
    }
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Length of inventory ${inventory.length}`);
        setInventory(data.items);
        setKey(data.key);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalStorage("inventory", inventory);
    }, 60000);
    return () => clearInterval(intervalId);
  }, [inventory]);

  const handlePage = (count: number) => {
    setPage(offset + count);
  };

  const handleNav = (nav: "search" | "inventory") => {
    setPath(nav);
  };

  const handleCatch = (data: Pokemon) => {
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setInventory([...inventory, data]);
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

      <div className="paginate">
        <button
          disabled={offset <= 0}
          onClick={() => handlePage(-20)}
          className="page"
        >
          Prev Page
        </button>
        <button onClick={() => handlePage(20)} className="page">
          Next Page
        </button>
      </div>
      {path == "search" ? (
        <div>
          <Pagination
            pokeList={pagePokemon}
            handleCatch={handleCatch}
          ></Pagination>
        </div>
      ) : (
        <Pagination pokeList={inventory}></Pagination>
      )}
    </>
  );
}

interface PaginationProps {
  pokeList: Pokemon[] | null;
  handleCatch?: (data: Pokemon) => void;
}

function Pagination(props: PaginationProps) {
  const { pokeList, handleCatch } = props;
  return (
    <>
      <div className="page">
        {pokeList ? (
          pokeList.map((entry) => (
            <PokemonComponent
              pokemon={entry}
              key={entry.id}
              handleCatch={handleCatch}
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
  pokemon: Pokemon;
  handleCatch?: (data: Pokemon) => void;
}

function PokemonComponent(props: PokemonProps) {
  const { pokemon, handleCatch } = props;

  return (
    <>
      <div className="pokemon">
        <img src={pokemon.sprites.front_default} alt="" />
        <p>{pokemon.name.toLocaleUpperCase()}</p>
        <ul className="abilities subline">
          Abilities
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <ul className="types subline">
          Types
          {pokemon.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
        {handleCatch ? (
          <button onClick={() => handleCatch(pokemon)}>Catch</button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
