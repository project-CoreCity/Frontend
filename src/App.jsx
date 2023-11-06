import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome/Welcome";
import Test from "./views/Test";
import Error from "./views/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/server-addresses" element={<Test />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
