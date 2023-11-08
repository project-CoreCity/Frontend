import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome/Welcome";
import ServerList from "./views/ServerAddressList";
import Error from "./views/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/server-addresses" element={<ServerList />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
