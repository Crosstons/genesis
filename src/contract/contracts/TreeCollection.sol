// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TreeCollection is ERC721, ERC721URIStorage{

    address parent;

    modifier onlyGenesis {
        require(msg.sender == parent, "You do not have access!");
        _;
    }

    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;

    constructor() ERC721("Genesis", "GNE") {
        parent = msg.sender;
    }

    function safeMint(address to, string memory uri) public onlyGenesis {
        tokenIdCounter.increment();
        uint256 tokenId = tokenIdCounter.current();
        require(tokenId <= 30, "There can be only 30 NFTs in a Tree Collection!");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}