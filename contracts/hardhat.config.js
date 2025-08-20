require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PK = process.env.DEPLOYER_PK || ""; // 0x... private key
const RPC = process.env.SKALE_RPC || "";   // https://... SKALE mainnet RPC

module.exports = {
  solidity: "0.8.20",
  networks: {
    skale: {
      url: RPC,
      accounts: PK ? [PK] : [],
    },
  },
};
