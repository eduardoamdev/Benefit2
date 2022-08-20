import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SetPrice from "./components/SetPrice";

const App = () => {
  return (
    <div>
      <NavBar />
      <ContractContext.Provider value={contract}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setPrice" element={<SetPrice />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
