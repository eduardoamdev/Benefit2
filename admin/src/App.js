import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BeginSold from "./components/BeginSold";
import Info from "./components/Info";
import Buy from "./components/Buy";

const App = () => {
  return (
    <div>
      <NavBar />
      <ContractContext.Provider value={contract}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/beginSold" element={<BeginSold />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
