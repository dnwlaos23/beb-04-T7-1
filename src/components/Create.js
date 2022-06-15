import React, { useState } from "react";
import Header from "./Header";
import "./Create.css";
import { create } from "ipfs-http-client";
import abi from "./abi";
import Web3 from "web3";
import * as IPFS from "ipfs-core";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Create = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [jsonUrl, setJsonUrl] = useState("");

  async function sendImgIPFS() {
    try {
      const imgAdded = await client.add(image);
      const imgUrl = `ipfs.infura.io/ipfs/${imgAdded.path}`;
      console.log({ imgUrl });
      const json = JSON.stringify({
        description: `${desc}`,
        image: `${imgUrl}`,
        name: `${title}`,
      });
      console.log({ json });
      const jsonAdded = await client.add(json);
      const jUrl = `ipfs.infura.io/ipfs/${jsonAdded.path}`;
      console.log({ jUrl });
      return jUrl;
    } catch (e) {
      console.log(e);
    }
  }

  const mint = async (jsonUrl) => {
    console.log(abi);
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const account = await web3.eth.getAccounts();
        const gasPrice = await web3.eth.getGasPrice();
        const myContract = new web3.eth.Contract(
          abi,
          "0x4A02c3b68bcb85F61C80a341579CE252080a02cD"
        );
        console.log(jsonUrl);
        const tx = await myContract.methods
          .mintNFT(account.toString(), jsonUrl)
          .send({
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

  return (
    <div className="container">
      <Header />
      <div className="desc">
        <h1>Create your own NFT!</h1>
      </div>
      <div className="half">
        <div className="left">
          <h2>Select your file!</h2>
          <p>
            <input
              type="file"
              className="file"
              onChange={(e) => {
                if (!e.target.files[0]) return;
                setImage(e.target.files[0]);
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  setPreview(reader.result);
                };
              }}
            />
          </p>
          <h3>
            title:
            <input
              type="text"
              style={{ borderRadius: "5px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </h3>
          <p></p>
          <h3>Description</h3>
          <textarea
            style={{ width: "400px", height: "240px", borderRadius: "13px" }}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className="right">
          <div>
            <h2>Preview</h2>
            <div
              className="preview"
              style={{ backgroundImage: `url(${preview})` }}
            />
            <input
              type="button"
              value="Make it!"
              style={{ fontSize: "25px", borderRadius: "10px" }}
              onClick={() => sendImgIPFS().then((jsonUrl) => mint(jsonUrl))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
