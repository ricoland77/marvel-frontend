import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import gost from "../assets/images/gost.jpg";

const CharactersId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const pictureGost =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  const secondPictureGost =
    "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";

  useEffect(() => {
    const fetchDataComics = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--dk8jf2pny52x.code.run/character/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataComics();
  }, [id]);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <>
      <div className="container">
        <div className="box-center">
          <section className="details">
            <div className="character-id">
              {`${data.thumbnail.path}.${data.thumbnail.extension}` ===
                pictureGost ||
              `${data.thumbnail.path}.${data.thumbnail.extension}` ===
                secondPictureGost ? (
                <img src={gost} alt="Marvel Heros" />
              ) : (
                <img
                  src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                  alt="Character"
                />
              )}
            </div>
            <div>
              <p className="details-name">{data.name}</p>
              <p className="details-description">{data.description}</p>
            </div>
          </section>
        </div>
      </div>

      <div className="container">
        {data.comics[0] && (
          <h1 className="presence">
            Retrouve <span>{data.name}</span> dans ces comics
          </h1>
        )}

        {/* carrousel */}
        <div className="carousel">
          {data.comics.map((comic, index) => {
            return (
              <div key={index} className="comics-present">
                <div>
                  <img
                    src={
                      `${comic.thumbnail.path}.${comic.thumbnail.extension}` ===
                      undefined
                        ? null
                        : `${comic.thumbnail.path}.${comic.thumbnail.extension}`
                    }
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default CharactersId;
