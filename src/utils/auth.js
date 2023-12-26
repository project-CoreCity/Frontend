import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "@/configs/firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    return { user: result.user, token };
  } catch (error) {
    console.error(error);

    return { error: error.message || "Google sign-in failed" };
  }
};
