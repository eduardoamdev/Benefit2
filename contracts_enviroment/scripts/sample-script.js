const hre = require("hardhat");

async function main() {
  const Benefit = await hre.ethers.getContractFactory("Benefit");

  const benefit = await Benefit.deploy();

  await benefit.deployed();

  console.log("Contract deployed to:", benefit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
