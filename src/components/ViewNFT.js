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
          const result = await myContract.methods.tokenURI(id).call();
          console.log({ result });
          axios.get(result).then((result) => {
            const { name, image, description } = result.data;
            setTitle(name);
            setSrc(image);
            setDesc(description);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNFT();
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [src, setSrc] = useState("");
  const [transfer, setTransfer] = useState(false);

  return (
    <div className="container">
      <Header />
      <div className="image">
        <img src={src} style={{ width: "400px", height: "400px" }} alt="NFT" />
        <div>
          <div className="title">
            <h1>Title: {title}</h1>
          </div>
          <div>
            <h2>Description: </h2>
            <h3>{desc}</h3>
          </div>
          {transfer ? (
            <div
              style={{
                width: "130px",
                height: "40px",
                marginLeft: "40px",
                backgroundColor: "orange",
                borderRadius: "13px",
                cursor: "pointer",
              }}
            >
              <h1>Transfer</h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewNFT;