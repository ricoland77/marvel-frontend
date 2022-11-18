import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharactersId = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchDataComics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/character/${id}`
        );

        setData(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // fetchDataChar();
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
              <img
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt=""
              />
            </div>
            <div>
              <p className="details-name">{data.name}</p>
              <p className="details-description">{data.description}</p>
            </div>

            {/* carrousel */}
          </section>
        </div>
      </div>

      <div className="container">
        <div className="carousel">
          {data.comics.map((comic, index) => {
            // console.log("ok", comic);
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
