import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/comics");
        // console.log(response.data);

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
      <div className="all-comics">
        {data.results.map((comics) => {
          return (
            <div className="comics" key={comics._id}>
              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt=""
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
