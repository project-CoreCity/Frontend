import { useSelector } from "react-redux";
import AuthenticationButton from "@/components/buttons/AuthenticationButton";
import UserMenu from "./UserMenu";
import { handleSignIn } from "@/utils/authenticate/handlers";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="flex items-center justify-end h-16">
      {isAuthenticated === null ? (
        ""
      ) : isAuthenticated ? (
        <UserMenu />
      ) : (
        <AuthenticationButton
          handler={handleSignIn}
          title="Sign in"
          css="mx-3 w-28 h-10 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-300 text-md text-[#0000BA]"
          ariaLabel="Sign in button"
        />
      )}
    </div>
  );
}

export default Header;
