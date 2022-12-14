require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// Connection to local node
module.exports = {
  solidity: "0.8.4",
};

// Connection to Mumbai Network
/* module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}; */

/* module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: process.env.INFURA_ROPSTEN_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}; */
