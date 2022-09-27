import { useState, useEffect } from "react";

const DappInfo = () => {
  let [info, setInfo] = useState({
    initialPrice: 0,
    totalSupply: 0,
    soldTokens: 0,
    contractBalance: 0,
  });

  const getInfo = async () => {
    const promise = await fetch(`http://127.0.0.1:8080/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
            supply {
              success
              message
              info
            }
            initialPrice {
              success
              message
              info
            }
            soldTokens {
              success
              message
              info
            }
            balance {
              success
              message
              info
            }
          }
          `,
      }),
    });

    const response = await promise.json();

    setInfo({
      ...info,
      initialPrice: response.data.initialPrice?.info | 0,
      totalSupply: response.data.supply?.info | 0,
      soldTokens: response.data.soldTokens?.info | 0,
      contractBalance: response.data.balance?.info | 0,
    });
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-orange margin-b-5 dynaFont">State of Benefit</h1>
      <table className="border-collapse-separate orange-border-4 border-radius-2">
        <tbody>
          <tr>
            <td className="padding-1">
              <p className="fs-2 fc-white">Total supply:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{info.totalSupply} BNF</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1">
              <p className="fs-2 fc-white">Sold tokens:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{info.soldTokens} BNF</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white ">
              <p className="fs-2">Initial price:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{info.initialPrice} ETH</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white">
              <p className="fs-2">Contract balance:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{info.contractBalance} ETH</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DappInfo;
