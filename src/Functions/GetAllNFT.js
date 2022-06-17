import Web3 from "web3";
import abi from "../components/abi";
import ContractAddr from "../components/ContractAddr";

async function GetAllNFT() {
  if (window.ethereum) {
    const allTokenJsonURL = [];
    const allTokenId = [];
    const web3 = new Web3(window.ethereum);
    try {
      console.log("getting Token...");
      const myContract = new web3.eth.Contract(abi, ContractAddr);
      const totalSupply = await myContract.methods.totalSupply().call();
      for (let i = 1; i <= totalSupply; i++) {
        const NFT = await myContract.methods.tokenURI(i).call();
        allTokenJsonURL.push(NFT);
        allTokenId.push(i);
      }
      return { allTokenId, allTokenJsonURL };
    } catch (e) {
      console.log(e);
    }
  }
}

export default GetAllNFT;
