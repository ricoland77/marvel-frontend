import { Link } from "react-router-dom";
import marvellogo from "../assets/images/marvel_logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="top-logo">
          <img src={marvellogo} alt="Logo Marvel" />
        </div>
        <nav className="nav">
          <Link to="/characters">
            <ul>personnages</ul>
          </Link>
          <Link to="/comics">
            <ul>comics</ul>
          </Link>

          <Link to="/favoris">
            <ul>favoris</ul>
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
