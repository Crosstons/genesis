require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


module.exports = {
  solidity: "0.8.17",
  networks: {
    aurora_plus: {
      url: "https://mainnet.aurora.dev",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 1313161554
    }
  }
};
