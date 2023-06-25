// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TreeCollection.sol";

contract Genesis is ERC20 {

    using Counters for Counters.Counter;
    Counters.Counter public TreeCollectionCounter;
    
    uint256 immutable base = 1e24;
    uint256 immutable gne = 1e18;
    ERC20 immutable STNEAR;

    address private admin;

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
        bool isInitialized;
    }

    struct UserTreeMapping {
        mapping(uint256 => TreeDetails) treeDetails; // mapping to store user details with its tokenID
    }

    mapping(uint256 => TreeCollection) public treecollections; // to keep record of collection with their IDs
    mapping(uint256 => UserTreeMapping) userTree; // mapping of a Tree with its collection
    mapping(uint256 => bool) collectionInitialized; // mapping to assign collectionID with bool

    function mintNewTreeCollection() public {
        require(msg.sender == admin, "Nope!");

        TreeCollectionCounter.increment();
        uint256 collectionID = TreeCollectionCounter.current();
        TreeCollection newCollection = new TreeCollection();
        treecollections[collectionID] = newCollection;
        collectionInitialized[collectionID] = true;
    }

    function mintTree(uint256 collectionID, string memory _uri) public {

        require(collectionInitialized[collectionID] == true, "Collection is not yet minted!");

        require(STNEAR.transferFrom(msg.sender, address(this), 5 * base), "STNEAR: transferFrom failed"); 

        TreeCollection treecollection = TreeCollection(treecollections[collectionID]);
        treecollection.safeMint(msg.sender, _uri); 
        uint256 tokenID = treecollection.tokenIdCounter();
        userTree[collectionID].treeDetails[tokenID] = TreeDetails(0, 0, 0, 0, true);
    }

    function water(uint256 _collectionID, uint256 _tokenID) public returns(bool) {

        require(collectionInitialized[_collectionID] == true, "Collection is not yet minted!");

        require(userTree[_collectionID].treeDetails[_tokenID].isInitialized, "Tree does not exist");

        TreeCollection treecollection = TreeCollection(treecollections[_collectionID]);

        require(treecollection.ownerOf(_tokenID) == msg.sender, "You are not the owner");

        require(STNEAR.transferFrom(msg.sender, address(this), 1 * base), "STNEAR: transferFrom failed"); 

        userTree[_collectionID].treeDetails[_tokenID].lastWatered = block.timestamp;
        userTree[_collectionID].treeDetails[_tokenID].wateredTimes += 1;

        return true;
    }

    function claim(uint256 _collectionID, uint256 _tokenID) public returns(bool) {

        require(collectionInitialized[_collectionID] == true, "Collection is not yet minted");

        require(userTree[_collectionID].treeDetails[_tokenID].isInitialized, "Tree does not exist");

        TreeCollection treecollection = TreeCollection(treecollections[_collectionID]);

        require(treecollection.ownerOf(_tokenID) == msg.sender, "You are not the owner");

        require(
            block.timestamp - userTree[_collectionID].treeDetails[_tokenID].lastWatered <= 43200, 
            "Water First"
        );
        require(
            block.timestamp - userTree[_collectionID].treeDetails[_tokenID].lastClaimed > 86400,
            "Can't Claim"
        );

        userTree[_collectionID].treeDetails[_tokenID].lastClaimed = block.timestamp;
        userTree[_collectionID].treeDetails[_tokenID].tokensYielded += 5;
        mint(msg.sender, 5 * gne);

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
}