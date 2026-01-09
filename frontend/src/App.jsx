import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import JDAnalysis from "./jdanalysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jdanalysis" element={<JDAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
