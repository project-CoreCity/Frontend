import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { authenticateUser } from "../../apis/user";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);

    const googleSignInResult = await signInWithGoogle();

    if (googleSignInResult.error) {
      setError(googleSignInResult.error);

      return;
    }

    const authenticateResult = await authenticateUser(googleSignInResult.token);

    if (authenticateResult.error) {
      setError(authenticateResult.error);

      return;
    }

    dispatch(
      setUser({
        id: authenticateResult.user.id,
        email: authenticateResult.user.email,
        name: authenticateResult.user.name,
        uid: authenticateResult.user.uid,
        token: googleSignInResult.token,
      }),
    );

    navigate("/server-addresses");
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
