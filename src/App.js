import "./App.css";
import ViewNFT from "./components/ViewNFT";
import Main from "./components/Main";
import Create from "./components/Create";
import Explore from "./components/Explore";
import MyPage from "./components/MyPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/viewNFT/:id" element={<ViewNFT />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
