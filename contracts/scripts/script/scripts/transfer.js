const hre = require("hardhat");

async function main() {
  const TOKEN = process.env.TOKEN_ADDRESS;
  const TO = process.env.TRANSFER_TO;
  const AMOUNT = process.env.TRANSFER_AMOUNT || "1000000000000000000"; // 1 token

  if (!TOKEN || !TO) throw new Error("Set TOKEN_ADDRESS and TRANSFER_TO env vars.");
  const signer = (await hre.ethers.getSigners())[0];
  const abi = [
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address) view returns (uint256)"
  ];
  const token = new hre.ethers.Contract(TOKEN, abi, signer);

  const tx = await token.transfer(TO, AMOUNT);
  console.log("⛓️ Transfer tx:", tx.hash);
  await tx.wait();
  const bal = await token.balanceOf(TO);
  console.log("✅ Transfer complete. Recipient balance:", bal.toString());
}

main().catch((e) => { console.error(e); process.exit(1); });
