// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Ztoken is ERC1155, Ownable, ERC1155Burnable {
    uint256 public constant NFT1 = 1;
    uint256 public constant NFT2 = 2;
    uint256 public constant NFT3 = 3;
    uint256 public constant NFT4 = 4;
    uint256 public constant NFT5 = 5;
    uint256 public constant NFT6 = 6;
    uint256 public constant NFT7 = 7;
    uint256 public constant NFT8 = 8;
    uint256 public constant NFT9 = 9;
    uint256 public constant NFT10 = 10;

    constructor( )
        ERC1155("ipfs://bafybeid2r5h3oeb64lh3h4tos5koxu7osdruaroi5fda3iszpvtolxoseq/{id}.json")
     
    {
        _mint(msg.sender, NFT1, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
        function uri(uint256 _tokenid) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "ipfs://bafybeid2r5h3oeb64lh3h4tos5koxu7osdruaroi5fda3iszpvtolxoseq/",
                Strings.toString(_tokenid),".json"
            )
        );
    }
}