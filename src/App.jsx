import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./views/welcome/Welcome";
import ServerList from "./views/server-list/ServerAddressList";
import Error from "./views/Error";
import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./config/firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./features/user/userSlice";
import { useEffect } from "react";
import { getUserInformation } from "./api/api";

function App() {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(clearUser());

        return;
      }

      const token = await user.getIdToken();
      const result = await getUserInformation(user.uid, token);

      if (result.error) {
        console.error(result.error);

        return;
      }

      dispatch(
        setUser({
          id: result._id,
          email: result.email,
          name: result.name,
          uid: result.uid,
          token: token,
        }),
      );
    });

    return () => unsubscribe();
  }, [dispatch]);

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
