import Web3 from "web3";
import abi from "../components/abi";
import ContractAddr from "../components/ContractAddr";

async function GetMyNFT() {
  if (window.ethereum) {
    const myTokenId = [];
    const myTokens = [];
    const web3 = new Web3(window.ethereum);
    try {
      console.log("getting all token...");
      const myContract = new web3.eth.Contract(abi, ContractAddr);
      const account = await web3.eth.getAccounts();
      const totalSupply = await myContract.methods.totalSupply().call();
      for (let i = 1; i <= totalSupply; i++) {
        const owner = await myContract.methods.ownerOf(i).call();
        if (account[0] === owner) myTokenId.push(i);
      }
      console.log("filtering my token only...");
      for (let i = 0; i < myTokenId.length; i++) {
        const token = await myContract.methods.tokenURI(myTokenId[i]).call();
        myTokens.push(token);
      }
      return { myTokens, myTokenId };
    } catch (error) {
      console.log(error);
    }
  }
}

export default GetMyNFT;
