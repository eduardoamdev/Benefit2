import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import DappInfo from "./components/DappInfo";
import Buy from "./components/Buy";
import Redeem from "./components/Redeem";

const App = () => {
  return (
    <div className="bg-black min-height-100">
      <NavBar />
      <ContractContext.Provider value={contract}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dappInfo" element={<DappInfo />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/redeem" element={<Redeem />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
