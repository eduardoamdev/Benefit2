import { useState, useEffect } from "react";

const Home = () => {
  let [wallet, setWallet] = useState({
    account: "",
  });

  const getAccounts = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setWallet({
      account,
    });
  };

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex jc-center pt-25">
      <h1 className="fs-2p5">Welcome to Benefit {wallet.account}</h1>
    </div>
  );
};

export default Home;
