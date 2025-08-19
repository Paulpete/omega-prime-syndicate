const hre = require("hardhat");

async function main() {
  const NAME = process.env.TOKEN_NAME || "Omega Prime";
  const SYMBOL = process.env.TOKEN_SYMBOL || "OPRIME";
  const SUPPLY = process.env.TOKEN_SUPPLY || "1000000000000000000000000"; // 1e24 = 1,000,000 OPRIME (18 decimals)

  const Factory = await hre.ethers.getContractFactory("OmegaPrimeToken");
  const token = await Factory.deploy(NAME, SYMBOL, SUPPLY);
  await token.waitForDeployment();

  const addr = await token.getAddress();
  console.log("✅ Deployed OmegaPrimeToken at:", addr);
}

main().catch((e) => { console.error(e); process.exit(1); });
