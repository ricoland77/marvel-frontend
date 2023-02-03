import axios from "axios";
import { useEffect, useState } from "react";

import loader from "../assets/images/tail-spin.svg";
import gost from "../assets/images/comics-not-found.jpg";

const Comics = () => {
  // Création de mes filtres de recherche
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");
  const [title, setTitle] = useState("");

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--dk8jf2pny52x.code.run/comics?limit=${limit}&skip=${skip}&title=${title}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [limit, skip, title]);

  return isLoading ? (
    <div className="container loader">
      <img src={loader} alt="loader" />
    </div>
  ) : (
    <section className="container">
      <form className="search">
        <input
          className="input-search"
          type="search"
          value={title}
          placeholder="Rechercher un comics"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <div className="filters">
          <input
            className="input-search-number"
            type="text"
            value={limit}
            placeholder="Nombre / page"
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          />
          <input
            className="input-search-number"
            type="text"
            value={skip}
            placeholder="skip"
            onChange={(event) => {
              setSkip(event.target.value);
            }}
          />
        </div>
      </form>

      <div className="all-comics">
        {data.results.map((comics) => {
          const picture = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;

          const pictureGost =
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

          return (
            <div className="comics" key={comics._id}>
              {picture === pictureGost ? (
                <img src={gost} alt="Marvel Heros" />
              ) : (
                <img src={picture} alt="Character" />
              )}

              <p className="comics-name">{comics.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
