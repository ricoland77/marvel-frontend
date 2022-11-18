import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = (limit, setLimit, skip, setSkip, name, setName) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(data.characters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?limit=${limit}`
        );
        // console.log(response.data);

        // &skip=${skip}&name=${name}

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <section className="container">
      {/* <input
        type="search"
        value={search}
        placeholder="Rechercher un personnage"
        onChange={(event) => {
          event.preventDefault();
        }}
      /> */}

      <div className="all-character">
        {data.results.map((characters) => {
          // je crée une variable picture
          const picture = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;

          // {picture !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"  ?   :   }
          return (
            <div className="character" key={characters._id}>
              <Link to={`/character/${characters._id}`}>
                <img src={picture} alt="Character" />
              </Link>
              <p className="character-name">{characters.name}</p>
              {characters.description && (
                <p className="characters-description">
                  {characters.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
