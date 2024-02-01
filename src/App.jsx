import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/views/header/Header";
import LandingPage from "@/views/landing-page/LandingPage";
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/server-addresses" element={<ServerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
