require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PK = process.env.DEPLOYER_PK || "0xYOUR_PRIVATE_KEY";
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Use a SKALE mainnet chain RPC.
    // Get a public endpoint for e.g. "Europa Liquidity Hub" from SKALE docs / portal.
    skale: {
      url: process.env.SKALE_RPC || "https://YOUR_SKALE_CHAIN_RPC",
      accounts: [PK]
    }
  }
};
