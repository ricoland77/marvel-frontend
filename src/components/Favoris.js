import works from "../assets/images/entravaux3.gif";

const Favoris = () => {
  return (
    <div className="favoris-loader">
      {/* <img src={loader} alt="loader" /> */}

      <div className="works">
        <img src={works} alt="works" />
        <p>en travaux...</p>
        <img src={works} alt="works" />
      </div>
    </div>
  );
};
export default Favoris;
