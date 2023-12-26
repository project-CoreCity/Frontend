import { useLocation, useNavigate } from "react-router-dom";
import { goBackToHome } from "@/utils/navigation";

function Error() {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage = location.state?.error || "An unknown error occurred";

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <button onClick={() => goBackToHome(navigate)}>Return to Home</button>
    </div>
  );
}

export default Error;
