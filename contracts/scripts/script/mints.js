const hre = require("hardhat");

async function main() {
  const TOKEN = process.env.TOKEN_ADDRESS;
  const TO = process.env.MINT_TO;
  const AMOUNT = process.env.MINT_AMOUNT || "1000000000000000000"; // 1 token

  if (!TOKEN || !TO) throw new Error("Set TOKEN_ADDRESS and MINT_TO env vars.");
  const signer = (await hre.ethers.getSigners())[0];
  const abi = [
    "function mint(address to, uint256 amount) external",
    "function balanceOf(address) view returns (uint256)",
    "function symbol() view returns (string)"
  ];
  const token = new hre.ethers.Contract(TOKEN, abi, signer);

  const tx = await token.mint(TO, AMOUNT);
  console.log("⛓️ Mint tx sent:", tx.hash);
  await tx.wait();
  const bal = await token.balanceOf(TO);
  console.log("✅ Minted. New balance:", bal.toString(), await token.symbol());
}

main().catch((e) => { console.error(e); process.exit(1); });
