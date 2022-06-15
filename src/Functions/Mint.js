import Web3 from "web3";
import abi from "../components/abi";
import ContractAddr from "../components/ContractAddr";

const Mint = async (jsonUrl) => {
  //   console.log(abi);
  if (window.ethereum) {
    // provider로 메타마스크 지정
    const web3 = new Web3(window.ethereum);
    try {
      // 현재 연결된 account를 가져오는 함수
      const account = await web3.eth.getAccounts();
      // 평균 가스비를 계산하는 함수
      const gasPrice = await web3.eth.getGasPrice();
      // 컨트랙트 객체를 만들어 method에 연결할 수 있게 해준다.
      const myContract = new web3.eth.Contract(abi, ContractAddr);
      console.log(jsonUrl);
      // Contract의 mintNFT 함수에 계정 정보와 ipfs json url를 인자값으로 제공하여 함수 실행
      const tx = await myContract.methods.mintNFT(jsonUrl).send({
        from: account.toString(),
        gas: 2000000,
        gasPrice,
      });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }
};

export default Mint;
