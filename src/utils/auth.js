import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../config/firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    return { user: result.user, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
