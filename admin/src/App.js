import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BeginSold from "./components/BeginSold";
import DappInfo from "./components/DappInfo";
import Buy from "./components/Buy";
import Balances from "./components/Balances";
import AddFunds from "./components/AddFunds";
import EndSold from "./components/EndSold";
import ExtractFunds from "./components/ExtractFunds";

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
          <Route path="/addFunds" element={<AddFunds />} />
          <Route path="/extractFunds" element={<ExtractFunds />} />
          <Route path="/endSold" element={<EndSold />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
