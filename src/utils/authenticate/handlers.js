import {
  signInWithGoogle,
  signOutWithGoogle,
} from "@/utils/authenticate/googleAuth";
import { authenticateUser } from "@/apis/user";
import { setUser, clearUser } from "@/features/user/userSlice";

export const handleSignIn = async (dispatch, navigate, setError) => {
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

export const handleSignOut = async (dispatch, navigate, setError) => {
  setError(null);

  try {
    await signOutWithGoogle();

    dispatch(clearUser());

    navigate("/");
  } catch (error) {
    setError(error.message);
  }
};
