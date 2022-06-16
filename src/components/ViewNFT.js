import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./ViewNFT.css";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import abi from "./abi";
import ContractAddr from "./ContractAddr";
import axios from "axios";

const ViewNFT = () => {
  let params = useParams();
  let id = Number(params.id);

  useEffect(() => {
    console.log(id);
    const getNFT = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          console.log("getting NFT...");
          const myContract = new web3.eth.Contract(abi, ContractAddr);
          const account = await web3.eth.getAccounts();
          const result = await myContract.methods.tokenURI(id).call();
          const owner = await myContract.methods.ownerOf(id).call();
          axios.get(result).then((result) => {
            const { name, image, description } = result.data;
            setTitle(name);
            setSrc(image);
            setDesc(description);
          });
          if (owner === account[0]) {
            console.log(owner);
            console.log(account[0]);
            return true;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNFT().then((result) => setTransfer(result));
  }, []);

  const sendNFT = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const myContract = new web3.eth.Contract(abi, ContractAddr);
        const gasPrice = await web3.eth.getGasPrice();
        const account = await web3.eth.getAccounts();
        const result = await myContract.methods
          .safeTransferFrom(account[0], address, id)
          .send({
            from: account[0],
            gas: 2000000,
            gasPrice: gasPrice,
          });
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [src, setSrc] = useState("");
  const [transfer, setTransfer] = useState(false);
  const [send, setSend] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <div className="container">
      <Header />
      <div className="image">
        <img
          src={src}
          style={{ width: "400px", height: "400px", borderRadius: "13px" }}
          alt="NFT"
        />
        <div>
          <div style={{ width: "400px" }}>
            <div className="title">
              <h1>Title: {title}</h1>
            </div>
            <div>
              <h2>Description: </h2>
              <h3>{desc}</h3>
            </div>
          </div>
          {transfer ? (
            <div>
              <div
                style={{
                  width: "130px",
                  height: "40px",
                  marginLeft: "40px",
                  backgroundColor: "orange",
                  borderRadius: "13px",
                  cursor: "pointer",
                }}
                onClick={() => setSend(true)}
              >
                <h1>Transfer</h1>
              </div>
              {send ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "12px",
                    }}
                  >
                    <h3>to address: </h3>
                    <input
                      type="text"
                      style={{
                        width: "200px",
                        height: "30px",
                        marginLeft: "15px",
                      }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: "pink",
                      width: "100px",
                      height: "40px",
                      marginLeft: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "14px",
                      cursor: "pointer",
                      marginTop: "30px",
                    }}
                    onClick={() =>
                      sendNFT().then((result) => {
                        if (result.status === true) {
                          alert("Transfer Success!");
                        } else {
                          alert("Trasnfer Failed ㅠㅠ");
                        }
                      })
                    }
                  >
                    <h2>Send!</h2>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewNFT;
