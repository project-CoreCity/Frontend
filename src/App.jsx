import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/views/header/Header";
import Welcome from "@/views/welcome/Welcome";
import ServerList from "@/views/server-list/ServerAddressList";
import Dashboard from "@/views/dashboard/Dashboard";
import Error from "@/views/Error";
import useAuthState from "@/hooks/useAuthState";
import useLoadApprovalRequestServerList from "@/hooks/useLoadApprovalRequestServerList";

function App() {
  useAuthState();

  useLoadApprovalRequestServerList();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/server-addresses" element={<ServerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
