// ipfs 서버 사용을 위한 세팅
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

async function SendImgIPFS(image, desc, title) {
  try {
    // client(provider)에 add함수를 사용하여 image 파일을 전송한다.(ipfs jsapi Docs 참고)
    const imgAdded = await client.add(image);
    // 전송한 이미지의 저장된 url을 변수에 담는다.
    const imgUrl = `https://ipfs.infura.io/ipfs/${imgAdded.path}`;
    console.log({ imgUrl });
    // 사용자가 입력한 titls, desc와 함께 위에서 저장한 imgUrl을 담아 json 파일을 만들어준다.
    const json = JSON.stringify({
      description: `${desc}`,
      image: `${imgUrl}`,
      name: `${title}`,
    });
    console.log({ json });
    // 위와 같은 방식으로 json 파일을 ipfs 서버에 추가해준다.
    const jsonAdded = await client.add(json);
    // json 파일이 저장되어있는 url을 변수에 담아주고, return한다.
    const jUrl = `https://ipfs.infura.io/ipfs/${jsonAdded.path}`;
    console.log({ jUrl });
    return jUrl;
  } catch (e) {
    console.log(e);
  }
}

export default SendImgIPFS;
