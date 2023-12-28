import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleSignIn, handleSignOut } from "@/utils/authenticate/handlers";

function Authentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [error, setError] = useState(null);

  return (
    <div className=" text-white flex flex-row-reverse">
      {error && <p>{error}</p>}

      <button
        className="mx-3 w-28 h-10 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-300 text-md text-[#0000BA]"
        onClick={() => {
          if (isAuthenticated === null) return;

          if (isAuthenticated) {
            handleSignOut(dispatch, navigate, setError);
          }

          if (!isAuthenticated) {
            handleSignIn(dispatch, navigate, setError);
          }
        }}
      >
        {isAuthenticated === null
          ? " "
          : isAuthenticated
          ? "Sign out"
          : "Sign in"}
      </button>
    </div>
  );
}

export default Authentication;
