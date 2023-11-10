// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.


const { ethers } = require("hardhat");
//import * as dotenv from "dotenv";
import { BigNumberish } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Contract, Signer } from "ethers";
import * as contract from "../artifacts/contracts/Ztoken.sol/Ztoken.json";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
//dotenv.config();
// let privateKey = process.env.MUMB_PRIVATE_KEY;
let signer:Signer = await ethers.getSigner();
//let privateKey = "70b934a754bf1952bafa57ef72fba1061020f74074f0016680065da2eeb57d2f";
//let provider = await new ethers.providers.JsonRpcProvider(process.env.API_URL_MATIC);
let provider = await new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/Hq1XRlmLWehLAFmv7BvD6wXcQ_4pH04L");
let contractAddress = "0x73F9e53b48B3c2b56A1618C2B3696e524bCbDD8A";

//let signer = await new ethers.Wallet(privateKey, provider);

let signerAddress = await signer.getAddress();

// 读取合约;
let ztokenContract = await new ethers.Contract(contractAddress, contract.abi,provider);
//写入合约
let ztokenContractSigner = await ztokenContract.connect(signer);

//let ztokenContractSigner = new ethers.Contract(contractAddress, contract.abi, signer);
// ... 或 ...
// let contractWithSigner = new Contract(contractAddress, abi, wallet)

// 设置一个新值，返回交易
let tx = await ztokenContractSigner.mint(signerAddress, 2, 1, "");

// 
console.log(tx.hash);


// 操作还没完成，需要等待挖矿
await tx.wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})
