import { useContext } from "react";
import { ContractContext } from "../context/contract";

const EndSold = () => {
  const contract = useContext(ContractContext);

  const endSold = async () => {
    await contract.functions.endSold();
  };

  const handleClick = (event) => {
    event.preventDefault();
    endSold();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">Turn off Benefit</h1>
      <button
        className="fs-1p6 padding-button bg-red fc-white white-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        EndSold
      </button>
    </div>
  );
};

export default EndSold;
