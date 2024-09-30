import { useState, useEffect } from "react";
import { ethers } from "ethers";
import voting_abi from "../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [votingSystem, setVotingSystem] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const votingABI = voting_abi.abi; 

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getVotingSystemContract();
  };

  const getVotingSystemContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, votingABI, signer);

    setVotingSystem(votingContract);
  };

  const getCandidates = async () => {
    if (votingSystem) {
      const count = await votingSystem.getCandidateCount();
      setCandidateCount(count.toNumber());

      let candidatesArray = [];
      for (let i = 0; i < count; i++) {
        const [name, voteCount] = await votingSystem.getCandidate(i);
        candidatesArray.push({ name, voteCount: voteCount.toNumber() });
      }
      setCandidates(candidatesArray);
    }
  };

  const checkHasVoted = async () => {
    if (votingSystem && account) {
      const voted = await votingSystem.hasVoted(account);
      setHasVoted(voted);
    }
  };

  const vote = async (candidateIndex) => {
    if (votingSystem) {
      let tx = await votingSystem.vote(candidateIndex);
      await tx.wait();
      getCandidates(); 
      checkHasVoted(); 
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this DApp.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
    }

    if (!votingSystem) {
      getVotingSystemContract();
    }

    if (candidates.length === 0) {
      getCandidates();
    }

    if (!hasVoted) {
      checkHasVoted();
    }

    return (
      <div>
        <h2>Welcome, {account}</h2>
        <h3>Total Candidates: {candidateCount}</h3>
        <h3>Voting Status: {hasVoted ? "You have already voted" : "You have not voted"}</h3>
        <div>
          {candidates.map((candidate, index) => (
            <div key={index}>
              <p>
                {candidate.name} - Votes: {candidate.voteCount}
              </p>
              {!hasVoted && (
                <button onClick={() => vote(index)}>
                  Vote for {candidate.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Voting System DApp</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
        }
      `}</style>
    </main>
  );
}
