// Import Hardhat Runtime Environment explicitly
const hre = require("hardhat");

async function main() {
  // Candidates list for the initial deployment (can be empty if no initial candidates)
  const initialCandidates = ["candidate 1 ", "candidate 2"];

  // Compile and deploy the VotingSystem contract
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy(initialCandidates);
  
  // Wait until the contract is deployed
  await votingSystem.deployed();

  console.log(`VotingSystem contract deployed to: ${votingSystem.address}`);
  console.log(`Initial candidates: ${initialCandidates}`);
}

// Main function to handle the script with proper error handling
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
