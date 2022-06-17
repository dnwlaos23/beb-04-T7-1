import React, { useState } from "react";
import Header from "./Header";
import "./Create.css";
import SendImgIPFS from "../Functions/SendImgIPFS";
import Mint from "../Functions/Mint";

const Create = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [jsonUrl, setJsonUrl] = useState("");

  return (
    <div className="container">
      <Header />
      <div className="desc" style={{ color: "black", marginTop: "3px" }}>
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
                // 미리보기를 만들어주는 함수, 내장모듈인 FileReader를 사용했다.
                if (!e.target.files[0]) return;
                // input type data에서 받아온 파일이 담긴 위치이다. 이를 먼저 useState에 있는 image 변수에 담아준다.
                setImage(e.target.files[0]);
                // FileReader 모듈을 사용하기 위한 객체 선언
                const reader = new FileReader();
                // FileReader 모듈 함수 중 하나인 readAsDataURL을 실행하여 가져온 파일을 읽어준다.
                reader.readAsDataURL(e.target.files[0]);
                // onload는 비동기함수이다. 위에서 선언한 readAsDataURL이 끝나면 자동으로 실행된다.
                reader.onload = () => {
                  // useState의 preview 변수에 읽은 파일을 담아주고, 이를 아래 div backgroundImage의 url로 삽입하여 화면에 렌더링해준다.
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
              className="Makeit"
              type="button"
              value="Make it!"
              style={{ fontSize: "25px", borderRadius: "10px" }}
              onClick={() =>
                SendImgIPFS(image, desc, title).then((jsonUrl) => Mint(jsonUrl))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
