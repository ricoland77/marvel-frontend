import axios from "axios";
import { useEffect, useState } from "react";

import loader from "../assets/images/tail-spin.svg";

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
          `http://localhost:4000/comics?limit=${limit}&skip=${skip}&title=${title}`
        );
        // console.log(response.data);

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
      <div>
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
        </form>
      </div>

      <div className="all-comics">
        {data.results.map((comics) => {
          return (
            <div className="comics" key={comics._id}>
              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt="comics"
              />
              <p className="comics-name">{comics.title}</p>
              {comics.description && (
                <p className="comics-description">{comics.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
