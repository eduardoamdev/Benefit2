import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BeginSold from "./components/BeginSold";
import DappInfo from "./components/DappInfo";
import Buy from "./components/Buy";
import Redeem from "./components/Redeem";
import AddFunds from "./components/AddFunds";
import ExtractFunds from "./components/ExtractFunds";
import ShareDividends from "./components/ShareDividends";
import EndSold from "./components/EndSold";

const App = () => {
  return (
    <div className="bg-black min-height-100">
      <NavBar />
      <ContractContext.Provider value={contract}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dappInfo" element={<DappInfo />} />
          <Route path="/beginSold" element={<BeginSold />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/addFunds" element={<AddFunds />} />
          <Route path="/extractFunds" element={<ExtractFunds />} />
          <Route path="/shareDividends" element={<ShareDividends />} />
          <Route path="/endSold" element={<EndSold />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
