import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/auth";

function SignIn() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await signInWithGoogle();
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST_BACKEND}/api/v1/user/auth-token`,
        { token },
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/server-addresses");
      }
    } catch (error) {
      console.error("Error occurred during login or authentication:", error);
      navigate("/error");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
