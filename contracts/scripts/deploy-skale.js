const hre = require("hardhat");

async function main() {
  const NAME   = process.env.TOKEN_NAME   || "Omega Prime";
  const SYMBOL = process.env.TOKEN_SYMBOL || "OPRIME";
  const SUPPLY = process.env.TOKEN_SUPPLY || "1000000000000000000000000"; // 1,000,000 * 1e18

  console.log("🔧 Compiling (if needed)...");
  await hre.run("compile");

  console.log("🚀 Deploying OmegaPrimeToken…");
  const Factory = await hre.ethers.getContractFactory("OmegaPrimeToken");
  const token = await Factory.deploy(NAME, SYMBOL, SUPPLY);
  await token.waitForDeployment();

  const addr = await token.getAddress();
  console.log(`✅ Deployed at: ${addr}`);

  // Write to GitHub Actions summary (nice UI)
  if (process.env.GITHUB_STEP_SUMMARY) {
    const fs = require("fs");
    fs.appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### ✅ OmegaPrimeToken Deployed\n\n- **Address:** \`${addr}\`\n- **Name/Symbol:** ${NAME} / ${SYMBOL}\n`
    );
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
