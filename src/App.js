import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// import de mes routes
import Comics from "./components/Comics";
import Favoris from "./components/Favoris";
import Header from "./components/Header";
import Characters from "./components/Characters";
import CharactersId from "./components/CharactersId";

function App() {
  // Création de mes filtres de recherche
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");
  const [name, setName] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/characters"
          element={
            <Characters
              limit={limit}
              setLimit={setLimit}
              skip={skip}
              setSkip={setSkip}
              name={name}
              setName={setName}
            />
          }
        />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character/:id" element={<CharactersId />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}

export default App;
