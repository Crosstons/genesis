// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Tree is ERC721, ERC721URIStorage, ERC721Burnable{

    address public parent;

    modifier onlyGenesis {
        require(msg.sender == parent, "You do not have access!");
        _;
    }

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    constructor() ERC721("Genesis", "GNE") {
        parent = msg.sender;
    }

    function safeMint(address to, string memory uri) public onlyGenesis {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function burn(uint256 tokenID) public override onlyGenesis {
        super._burn(tokenID);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

contract Genesis is ERC20 {

    Tree public tree;
    uint256 immutable base = 1e24;

    ERC20 immutable STNEAR;

    constructor(address _token) ERC20("Genesis", "GNE"){
        tree = new Tree();
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

    mapping(uint256 => TreeDetails) public userstree;

    function mintTree(string memory _uri) public {

        require(STNEAR.transferFrom(msg.sender, address(this), 5 * base), "STNEAR: transferFrom failed"); 

        tree.safeMint(msg.sender, _uri);
        uint256 tokenID = tree._tokenIdCounter() - 1;
        userstree[tokenID] = TreeDetails(0, 0, 0, 0, true);
    }

    function water(uint256 tokenID) public returns(bool) {

        require(userstree[tokenID].isInitialized, "Tree not initialized. Mint a tree first.");
        require(tree.ownerOf(tokenID) == msg.sender, "You are not the owner!");

        require(STNEAR.transferFrom(msg.sender, address(this), 1 * base), "STNEAR: transferFrom failed"); 
        
        userstree[tokenID].lastWatered = block.timestamp;
        userstree[tokenID].wateredTimes += 1;

        return true;
    }

    function claim(uint256 tokenID) public returns(bool) {
        require(userstree[tokenID].isInitialized, "Tree not initialized. Mint a tree first.");
        require(tree.ownerOf(tokenID) == msg.sender, "You are not the owner!");
        require(
            block.timestamp - userstree[tokenID].lastWatered <= 43200, 
            "Looks like some of us are trying to revolutionize agriculture by claiming rewards without watering their plants!"
        );
        require(
            block.timestamp - userstree[tokenID].lastClaimed > 86400,
            "You are not eligible to claim"
        );
        userstree[tokenID].lastClaimed = block.timestamp;
        userstree[tokenID].tokensYielded += 5;
        mint(msg.sender, 5 * 10 ** 18);

        return true;
    }
}