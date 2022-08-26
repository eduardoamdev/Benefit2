import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BeginSold from "./components/BeginSold";
import DappInfo from "./components/DappInfo";
import Buy from "./components/Buy";
import Balances from "./components/Balances";

const App = () => {
  return (
    <div className="bg-black height-100">
      <NavBar />
      <ContractContext.Provider value={contract}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dappInfo" element={<DappInfo />} />
          <Route path="/beginSold" element={<BeginSold />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/balances" element={<Balances />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
