import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { authenticateUser } from "../../api/api";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);

    try {
      const { token } = await signInWithGoogle();
      const data = await authenticateUser(token);

      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          token: token,
        }),
      );

      navigate("/server-addresses");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
