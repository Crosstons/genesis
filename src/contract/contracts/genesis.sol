// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TreeCollection.sol";

contract Genesis is ERC20 {

    using Counters for Counters.Counter;
    Counters.Counter public TreeCollectionCounter;

    ERC20 immutable STNEAR;
    address immutable admin;

    constructor(address _token) ERC20("Genesis", "GNE"){
        admin = msg.sender;
        STNEAR = ERC20(_token);
    }

    function mint(address to, uint256 amount) internal{
        _mint(to, amount);
    }

    struct TreeDetails{
        uint256 lastWatered;
        uint256 lastClaimed;
        uint256 wateredTimes;
        uint256 tokensYielded;
    }

    struct UserTreeMapping {
        mapping(uint256 => TreeDetails) treeDetails; // mapping to store user details with its tokenID
    }

    mapping(uint256 => TreeCollection) public treecollections; // to keep record of collection with their IDs
    mapping(TreeCollection => uint256) public CollectionToID; // to get contract instance using their IDs
    mapping(uint256 => UserTreeMapping) userTree; // mapping of a Tree with its collection

    function mintNewTreeCollection(string memory name, string memory symbol) public {

        require(msg.sender == admin, "Nope!");

        TreeCollectionCounter.increment();
        uint256 collectionID = TreeCollectionCounter.current();
        TreeCollection newCollection = new TreeCollection(name, symbol);
        treecollections[collectionID] = newCollection;
        CollectionToID[newCollection] = collectionID;
    }

    function mintTree(uint256 collectionID, string memory _uri) public {

        require(STNEAR.transferFrom(msg.sender, address(this), 5 * 10 ** 24), "STNEAR: transferFrom failed"); 

        TreeCollection treecollection = TreeCollection(treecollections[collectionID]);
        treecollection.safeMint(msg.sender, _uri); 
        uint256 tokenID = treecollection.tokenIdCounter();
        userTree[collectionID].treeDetails[tokenID] = TreeDetails(0, 0, 0, 0);
    }

    function water(uint256 _collectionID, uint256 _tokenID) public returns(bool) {

        TreeCollection treecollection = TreeCollection(treecollections[_collectionID]);

        require(treecollection.ownerOf(_tokenID) == msg.sender, "You are not the owner");

        require(STNEAR.transferFrom(msg.sender, address(this), 1 * 10 ** 24), "STNEAR: transferFrom failed"); 

        userTree[_collectionID].treeDetails[_tokenID].lastWatered = block.timestamp;
        userTree[_collectionID].treeDetails[_tokenID].wateredTimes += 1;

        return true;
    }

    function claim(uint256 _collectionID, uint256 _tokenID) public returns(bool) {

        TreeCollection treecollection = TreeCollection(treecollections[_collectionID]);

        require(treecollection.ownerOf(_tokenID) == msg.sender, "You are not the owner");

        require(block.timestamp - userTree[_collectionID].treeDetails[_tokenID].lastWatered <= 43200, "Water First");
        require(block.timestamp - userTree[_collectionID].treeDetails[_tokenID].lastClaimed > 86400, "Can't Claim");

        userTree[_collectionID].treeDetails[_tokenID].lastClaimed = block.timestamp;
        userTree[_collectionID].treeDetails[_tokenID].tokensYielded += 5;
        mint(msg.sender, 5 * 10 ** 18);

        return true;
    }

    function getTreeDetails(uint256 collectionId, uint256 tokenId) public view returns(TreeDetails memory) {
        return userTree[collectionId].treeDetails[tokenId];
        //returns details related to a particula NFT(Tree)
    }

    function returnNFTcount(uint256 collectionID) public view returns(uint256) {
        return (treecollections[collectionID].tokenIdCounter());
        //returns NFTs minted in a particular collection
    }

    function getCollectionID(TreeCollection collection) public view returns (uint256) {
        return CollectionToID[collection];
        // to get particular collection ID using its instance
    }
}