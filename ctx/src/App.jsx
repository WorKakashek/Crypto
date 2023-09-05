import { Route, Routes } from "react-router-dom";
import MainPage from "./components/Main/mainpage";
import MorePage from "./components/More/more";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/more" element={<MorePage />} /> */}
    </Routes>
  );
}

export default App;
