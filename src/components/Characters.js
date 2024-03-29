import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loader from "../assets/images/tail-spin.svg";
import gost from "../assets/images/gost.jpg";

const Characters = () => {
  // Création de mes filtres de recherche
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");
  const [name, setName] = useState("");

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--dk8jf2pny52x.code.run/characters?limit=${limit}&skip=${skip}&name=${name}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [limit, skip, name]);

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
          value={name}
          placeholder="Rechercher un personnage"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <div className="filters">
          <input
            className="input-search-number"
            type="text"
            value={limit}
            placeholder="pers. / page"
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          />

          <input
            className="input-search-number"
            type="text"
            value={skip}
            placeholder="ex. : 50 prochains"
            onChange={(event) => {
              setSkip(event.target.value);
            }}
          />
        </div>
      </form>
      <div className="all-character">
        {data.results.map((characters) => {
          // je crée une variable picture
          const picture = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;

          const pictureGost =
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

          const secondPictureGost =
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";

          return (
            <div className="fix-zoom">
              <div className="character" key={characters._id}>
                <Link to={`/character/${characters._id}`}>
                  {picture === pictureGost || picture === secondPictureGost ? (
                    <img src={gost} alt="Marvel Heros" />
                  ) : (
                    <img src={picture} alt="Character" />
                  )}
                </Link>
                <div className="favoris">
                  <p className="character-name">{characters.name}</p>
                  <div className="heart">
                    <i
                      class="fa-regular fa-heart"
                      onClick={() => {
                        toast.error(
                          "Désolé, pour le moment cette fonctionnalité ne te permet pas d'ajouter un personnage dans les favoris !"
                        );
                        Cookies.set("favoris", characters._id, { expires: 17 });
                      }}
                    ></i>
                    <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="dark"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      ;
    </section>
  );
};

export default Characters;
