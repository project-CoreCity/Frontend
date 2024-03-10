import { useLocation } from "react-router-dom";
import NavigationButton from "@/components/buttons/NavigationButton";

function Error() {
  const location = useLocation();
  const errorMessage = location.state?.error || "An unknown error occurred.";

  return (
    <main>
      <div className="flex flex-col items-center justify-center w-screen h-screen text-white">
        <h2 className="text-xl">Error</h2>

        <p className="my-5">{errorMessage}</p>

        <NavigationButton
          path={"/"}
          title="Back to Home"
          css="flex items-center justify-center px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-300 hover:to-cyan-300 font-medium text-[#0000BA]"
          ariaLabel="Server list view button"
        />
      </div>
    </main>
  );
}

export default Error;
