// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {

    struct Candidate {
        string name;
        uint256 voteCount;
    }
    address public owner;
    Candidate[] public candidates;

    mapping(address => bool) public hasVoted;

    event Voted(uint256 candidateIndex, address voter);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(string[] memory candidateNames) {
        owner = msg.sender; 
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint256 candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(candidateIndex < candidates.length, "Invalid candidate index.");
        
        candidates[candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(candidateIndex, msg.sender);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    function getCandidate(uint256 index) public view returns (string memory, uint256) {
        require(index < candidates.length, "Incorrect candidate index.");
        return (candidates[index].name, candidates[index].voteCount);
    }
}
