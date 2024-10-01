# **Voting System DApp**

This project is a decentralized voting system built on Ethereum, utilizing **Solidity** for the smart contract and **React** with **ethers.js** for the frontend. The project allows users to vote for candidates in a transparent and immutable manner.

## **Project Structure**

The project consists of two main components:

1. **Solidity Smart Contract**: A contract that manages voting, candidate management, and vote tallying.
2. **React Frontend**: A user-friendly interface that allows users to connect their wallet, view candidates, and cast votes.

## Project Components

Solidity Contract (VotingSystem.sol)
Owner: Only the contract owner can add candidates to the voting system.
Vote Tracking: Each account can vote only once, and the votes are stored immutably on the blockchain.
Candidate Struct: Stores the candidate's name and vote count.
Key functions:

addCandidate(string memory name): Adds a new candidate (owner only).
vote(uint256 candidateIndex): Allows a user to vote for a specific candidate.
getCandidate(uint256 index): Retrieves a candidate's details.
getCandidateCount(): Returns the total number of candidates.
React Frontend
The frontend allows users to:

Connect their MetaMask wallet.
View all candidates and their current vote counts.
Cast their vote if they haven’t voted yet.
We use ethers.js to interact with the Ethereum blockchain and the smart contract.

Hardhat Scripts
scripts/deploy.js: Contains the deployment script for deploying the smart contract to any Ethereum-compatible network.


## **Getting Started**

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## License
This project is licensed under the MIT License - see the LICENSE file for details.
