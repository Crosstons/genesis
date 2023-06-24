const hre = require("hardhat");

async function main() {

  const stnearAddress = '0x07F9F7f963C5cD2BBFFd30CcfB964Be114332E30';

  await hre.run('compile');

  const Genesis = await hre.ethers.getContractFactory("Genesis");
  const genesis = await Genesis.deploy(stnearAddress);

  await genesis.deployed();

  console.log("Genesis deployed to:", genesis.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
